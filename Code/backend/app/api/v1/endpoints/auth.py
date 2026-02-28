import os
import shutil
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.services.auth_service import AuthService
from app.schemas.user import (
    LoginRequest, ChangePasswordRequest,
    RefreshTokenRequest, UpdateProfileRequest
)
from app.utils.response import success_response, error_response
from app.models.user import User
from datetime import datetime  # ✅ YEH IMPORT ADD KIA

router = APIRouter(prefix="/auth", tags=["Authentication"])

UPLOAD_DIR = "uploads/avatars"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ─── Helper: profile data extract ───────────────────────
def _build_profile(user: User) -> dict:
    base = {
        "user_id": user.id,
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active,
        "last_login": str(user.last_login) if user.last_login else None,
        "created_at": str(user.created_at) if user.created_at else None,
    }

    if user.role == "student" and user.student_profile:
        p = user.student_profile
        base.update({
            "full_name": p.full_name,
            "phone": p.phone,
            "profile_picture_url": p.profile_picture_url,
            "roll_number": user.roll_number,
            "father_name": p.father_name,
            "date_of_birth": str(p.date_of_birth) if p.date_of_birth else None,
            "gender": p.gender,
            "cnic": p.cnic,
            "city": p.city,
            "current_address": p.current_address,
            "guardian_phone": p.guardian_phone,
        })

    elif user.role == "teacher" and user.teacher_profile:
        p = user.teacher_profile
        base.update({
            "full_name": p.full_name,
            "phone": p.phone,
            "profile_picture_url": p.profile_picture_url,
            "employee_id": p.employee_id,
            "designation": p.designation,
            "qualification": p.qualification,
            "specialization": p.specialization,
            "joining_date": str(p.joining_date) if p.joining_date else None,
            "cnic": p.cnic,
            "address": p.address,
        })

    elif user.role == "admin" and user.admin_profile:
        p = user.admin_profile
        base.update({
            "full_name": p.full_name,
            "phone": p.phone,
            "profile_picture_url": p.profile_picture_url,
            "employee_id": p.employee_id,
            "designation": p.designation,
            "role_type": p.role_type,
        })
    else:
        base["full_name"] = user.email

    return base


# ─── ENDPOINTS ──────────────────────────────────────────

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    result, error = AuthService.login(db, request.email, request.password)
    if error:
        return error_response(error, "LOGIN_FAILED", status_code=401)
    return success_response(result, "Login successful")


@router.get("/profile")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Fresh user from DB with relationships
    user = db.query(User).filter(User.id == current_user.id).first()
    return success_response(_build_profile(user), "Profile retrieved")


@router.put("/profile")
def update_profile(
    request: UpdateProfileRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == current_user.id).first()

    if user.role == "student" and user.student_profile:
        p = user.student_profile
        for field in ["full_name", "phone", "city", "current_address"]:
            val = getattr(request, field, None)
            if val is not None:
                setattr(p, field, val)

    elif user.role == "teacher" and user.teacher_profile:
        p = user.teacher_profile
        for field in ["full_name", "phone", "designation", "qualification", "specialization"]:
            val = getattr(request, field, None)
            if val is not None:
                setattr(p, field, val)

    elif user.role == "admin" and user.admin_profile:
        p = user.admin_profile
        for field in ["full_name", "phone", "designation"]:
            val = getattr(request, field, None)
            if val is not None:
                setattr(p, field, val)

    db.commit()
    db.refresh(user)
    return success_response(_build_profile(user), "Profile updated successfully")


@router.post("/profile/upload-picture")
async def upload_profile_picture(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Validate file type
    allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in allowed:
        return error_response("Only JPG, PNG, WEBP allowed", "INVALID_FILE")

    # Max 3MB
    contents = await file.read()
    if len(contents) > 3 * 1024 * 1024:
        return error_response("File size must be under 3MB", "FILE_TOO_LARGE")

    # Save file with timestamp - ✅ YAHAN CHANGE KIA
    ext = file.filename.split(".")[-1]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")  # ✅ TIMESTAMP ADD KIA
    filename = f"user_{current_user.id}_{timestamp}.{ext}"  # ✅ UPDATED FILENAME
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(contents)

    # URL jo frontend use karega
    picture_url = f"/uploads/avatars/{filename}"

    # DB update
    user = db.query(User).filter(User.id == current_user.id).first()
    profile = (
        user.student_profile or
        user.teacher_profile or
        user.admin_profile
    )
    if profile:
        profile.profile_picture_url = picture_url
        db.commit()

    return success_response(
        {"profile_picture_url": picture_url},
        "Profile picture uploaded successfully"
    )


@router.post("/change-password")
def change_password(
    request: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    success, error = AuthService.change_password(
        db, current_user,
        request.current_password,
        request.new_password
    )
    if not success:
        return error_response(error, "PASSWORD_CHANGE_FAILED")
    return success_response(message="Password changed successfully")


@router.post("/refresh-token")
def refresh_token(request: RefreshTokenRequest, db: Session = Depends(get_db)):
    from app.core.security import decode_token, create_access_token

    payload = decode_token(request.refresh_token)
    if not payload or payload.get("type") != "refresh":
        return error_response("Invalid or expired refresh token", "INVALID_TOKEN", status_code=401)

    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first()

    if not user or not user.is_active:
        return error_response("User not found or inactive", "USER_INACTIVE", status_code=401)

    token_data = {"sub": str(user.id), "role": user.role}
    new_access_token = create_access_token(token_data)

    return success_response({
        "access_token": new_access_token,
        "token_type": "bearer"
    }, "Token refreshed successfully")