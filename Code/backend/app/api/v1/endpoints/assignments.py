from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user, require_teacher
from app.services.assessment_service import AssignmentService
from app.schemas.assessment import (
    AssignmentCreateRequest, AssignmentUpdateRequest,
    AssignmentSubmitRequest, GradeSubmissionRequest
)
from app.utils.response import success_response, error_response

router = APIRouter(tags=["Assignments"])


@router.post("/offerings/{offering_id}/assignments")
def create_assignment(
    offering_id: int,
    request: AssignmentCreateRequest,
    db: Session = Depends(get_db),
    current_user = Depends(require_teacher)
):
    data = request.model_dump()
    data["offering_id"] = offering_id

    assignment, error = AssignmentService.create(db, data, current_user.id)
    if error:
        return error_response(error, "CREATE_FAILED")

    return success_response({
        "id": assignment.id,
        "title": assignment.title,
        "total_marks": assignment.total_marks,
        "due_date": str(assignment.due_date),
        "weightage_percent": float(assignment.weightage_percent)
    }, "Assignment created successfully", status_code=201)


@router.get("/offerings/{offering_id}/assignments")
def get_assignments(
    offering_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    assignments = AssignmentService.get_offering_assignments(db, offering_id)
    data = [{
        "id": a.id,
        "title": a.title,
        "total_marks": a.total_marks,
        "weightage_percent": float(a.weightage_percent),
        "due_date": str(a.due_date),
        "file_required": a.file_required,
        "allowed_file_types": a.allowed_file_types,
        "total_submissions": len(a.submissions)
    } for a in assignments]

    return success_response({
        "offering_id": offering_id,
        "total": len(data),
        "assignments": data
    }, "Assignments retrieved")


@router.get("/assignments/{assignment_id}")
def get_assignment(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    assignment = AssignmentService.get_by_id(db, assignment_id)
    if not assignment:
        return error_response("Assignment not found", "NOT_FOUND", status_code=404)

    return success_response({
        "id": assignment.id,
        "title": assignment.title,
        "description": assignment.description,
        "total_marks": assignment.total_marks,
        "weightage_percent": float(assignment.weightage_percent),
        "due_date": str(assignment.due_date),
        "file_required": assignment.file_required,
        "max_file_size": assignment.max_file_size,
        "allowed_file_types": assignment.allowed_file_types,
        "plagiarism_check": assignment.plagiarism_check,
        "total_submissions": len(assignment.submissions)
    })


@router.put("/assignments/{assignment_id}")
def update_assignment(
    assignment_id: int,
    request: AssignmentUpdateRequest,
    db: Session = Depends(get_db),
    current_user = Depends(require_teacher)
):
    assignment, error = AssignmentService.update(
        db, assignment_id, request.model_dump(exclude_none=True)
    )
    if error:
        return error_response(error, "UPDATE_FAILED", status_code=404)

    return success_response(message="Assignment updated successfully")


@router.post("/assignments/{assignment_id}/submit")
def submit_assignment(
    assignment_id: int,
    request: AssignmentSubmitRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    submission, error = AssignmentService.submit(
        db, assignment_id, current_user.id, request.model_dump()
    )
    if error:
        return error_response(error, "SUBMIT_FAILED")

    return success_response({
        "id": submission.id,
        "assignment_id": submission.assignment_id,
        "student_id": submission.student_id,
        "submission_date": str(submission.submission_date),
        "status": submission.status,
        "file_path": submission.file_path
    }, "Assignment submitted successfully", status_code=201)


@router.get("/assignments/{assignment_id}/submissions")
def get_submissions(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_teacher)
):
    submissions = AssignmentService.get_submissions(db, assignment_id)
    data = [{
        "id": s.id,
        "student_id": s.student_id,
        "roll_number": s.student.roll_number if s.student else None,
        "full_name": s.student.student_profile.full_name
            if s.student and s.student.student_profile else None,
        "submission_date": str(s.submission_date),
        "status": s.status,
        "obtained_marks": float(s.obtained_marks) if s.obtained_marks else None,
        "plagiarism_percentage": float(s.plagiarism_percentage)
            if s.plagiarism_percentage else None
    } for s in submissions]

    return success_response({
        "assignment_id": assignment_id,
        "total": len(data),
        "graded": sum(1 for s in submissions if s.status == "graded"),
        "pending": sum(1 for s in submissions if s.status == "submitted"),
        "submissions": data
    }, "Submissions retrieved")


@router.patch("/submissions/{submission_id}/grade")
def grade_submission(
    submission_id: int,
    request: GradeSubmissionRequest,
    db: Session = Depends(get_db),
    current_user = Depends(require_teacher)
):
    submission, error = AssignmentService.grade_submission(
        db,
        submission_id,
        obtained_marks=request.obtained_marks,
        feedback=request.feedback,
        graded_by=current_user.id,
        status=request.status
    )
    if error:
        return error_response(error, "GRADE_FAILED")

    return success_response({
        "submission_id": submission.id,
        "obtained_marks": float(submission.obtained_marks),
        "feedback": submission.feedback,
        "status": submission.status,
        "graded_at": str(submission.graded_at)
    }, "Submission graded successfully")