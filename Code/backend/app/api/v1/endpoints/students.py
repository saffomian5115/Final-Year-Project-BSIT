from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import require_admin, get_current_user
from app.services.user_service import UserService
from app.schemas.user import StudentCreateRequest, StudentUpdateRequest
from app.utils.response import success_response, error_response

router = APIRouter(prefix="/students", tags=["Students"])


@router.post("")
def create_student(
    request: StudentCreateRequest,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    result, error = UserService.create_student(db, request.model_dump())
    if error:
        return error_response(error, "CREATE_FAILED")

    return success_response({
        "user_id": result["user"].id,
        "roll_number": result["user"].roll_number,
        "email": result["user"].email,
        "temp_password": result["temp_password"],
        "message": "Share this temp password with student"
    }, "Student created successfully", status_code=201)


@router.get("")
def get_students(
    page: int = 1,
    per_page: int = 10,
    search: str = "",
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    students, total = UserService.get_students(db, page, per_page, search)

    students_data = []
    for s in students:
        p = s.student_profile
        students_data.append({
            "user_id": s.id,
            "roll_number": s.roll_number,
            "email": s.email,
            "full_name": p.full_name if p else None,
            "father_name": p.father_name if p else None,
            "phone": p.phone if p else None,
            "gender": p.gender if p else None,
            "city": p.city if p else None,
            "cnic": p.cnic if p else None,
            "is_active": s.is_active,
            "created_at": str(s.created_at),
        })

    return success_response({
        "students": students_data,
        "pagination": {
            "total": total,
            "page": page,
            "per_page": per_page,
            "total_pages": (total + per_page - 1) // per_page
        }
    }, "Students retrieved successfully")


@router.get("/{student_id}")
def get_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    student = UserService.get_student_by_id(db, student_id)
    if not student:
        return error_response("Student not found", "NOT_FOUND", status_code=404)

    p = student.student_profile
    return success_response({
        "user_id": student.id,
        "roll_number": student.roll_number,
        "email": student.email,
        "is_active": student.is_active,
        "created_at": str(student.created_at),
        "profile": {
            "full_name": p.full_name if p else None,
            "father_name": p.father_name if p else None,
            "date_of_birth": str(p.date_of_birth) if p and p.date_of_birth else None,
            "gender": p.gender if p else None,
            "cnic": p.cnic if p else None,
            "phone": p.phone if p else None,
            "city": p.city if p else None,
            "current_address": p.current_address if p else None,
            "guardian_phone": p.guardian_phone if p else None,
            "guardian_relation": p.guardian_relation if p else None,
        }
    }, "Student retrieved")


@router.put("/{student_id}")
def update_student(
    student_id: int,
    request: StudentUpdateRequest,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    user, error = UserService.update_student(
        db, student_id, request.model_dump(exclude_none=True)
    )
    if error:
        return error_response(error, "UPDATE_FAILED", status_code=404)

    p = user.student_profile
    return success_response({
        "user_id": user.id,
        "full_name": p.full_name if p else None,
    }, "Student updated successfully")


@router.patch("/{student_id}/status")
def toggle_status(
    student_id: int,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    user, error = UserService.toggle_student_status(db, student_id)
    if error:
        return error_response(error, "TOGGLE_FAILED", status_code=404)
    return success_response({
        "user_id": user.id,
        "is_active": user.is_active
    }, f"Student {'activated' if user.is_active else 'deactivated'}")