from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.services.auth_service import AuthService
from app.schemas.user import LoginRequest, ChangePasswordRequest, RefreshTokenRequest
from app.utils.response import success_response, error_response
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    result, error = AuthService.login(db, request.email, request.password)
    
    if error:
        return error_response(error, "LOGIN_FAILED", status_code=401)
    
    return success_response(result, "Login successful")

@router.post("/change-password")
def change_password(
    request: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    success, error = AuthService.change_password(
        db, current_user,
        request.current_password,
        request.new_password
    )
    
    if not success:
        return error_response(error, "PASSWORD_CHANGE_FAILED")
    
    return success_response(message="Password changed successfully")

@router.get("/me")
def get_current_user_info(current_user = Depends(get_current_user)):
    return success_response({
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "is_active": current_user.is_active
    }, "User info retrieved")

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
    
    from datetime import timedelta
    token_data = {"sub": str(user.id), "role": user.role}
    new_access_token = create_access_token(token_data)
    
    return success_response({
        "access_token": new_access_token,
        "token_type": "bearer"
    }, "Token refreshed successfully")