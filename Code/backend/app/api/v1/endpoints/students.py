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
    admin = Depends(require_admin)
):
    result, error = UserService.create_student(db, request.model_dump())
    
    if error:
        return error_response(error, "CREATE_FAILED")
    
    return success_response({
        "user_id": result["user"].id,
        "roll_number": result["user"].roll_number,
        "email": result["user"].email,
        "temp_password": result["temp_password"],  # Admin ko dikhao
        "message": "Share this temp password with student"
    }, "Student created successfully", status_code=201)

@router.get("")
def get_students(
    page: int = 1,
    per_page: int = 20,
    db: Session = Depends(get_db),
    admin = Depends(require_admin)
):
    students, total = UserService.get_students(db, page, per_page)
    
    students_data = []
    for s in students:
        p = s.student_profile
        students_data.append({
            "user_id": s.id,
            "roll_number": s.roll_number,
            "email": s.email,
            "full_name": p.full_name if p else None,
            "phone": p.phone if p else None,
            "is_active": s.is_active
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
    current_user = Depends(get_current_user)
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
        "profile": {
            "full_name": p.full_name if p else None,
            "father_name": p.father_name if p else None,
            "gender": p.gender if p else None,
            "phone": p.phone if p else None,
            "city": p.city if p else None,
            "cnic": p.cnic if p else None,
        }
    })

@router.put("/{student_id}")
def update_student(
    student_id: int,
    request: StudentUpdateRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    student, error = UserService.update_student(
        db, student_id, request.model_dump(exclude_none=True)
    )
    
    if error:
        return error_response(error, "UPDATE_FAILED", status_code=404)
    
    return success_response(message="Student updated successfully")

@router.patch("/{student_id}/status")
def toggle_status(
    student_id: int,
    db: Session = Depends(get_db),
    admin = Depends(require_admin)
):
    student, error = UserService.toggle_student_status(db, student_id)
    
    if error:
        return error_response(error, "NOT_FOUND", status_code=404)
    
    status = "activated" if student.is_active else "deactivated"
    return success_response(
        {"is_active": student.is_active},
        f"Student {status} successfully"
    )