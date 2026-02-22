from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, students, teachers,
    departments, programs, semesters, courses,
    offerings, enrollments, attendance,
    assignments, quizzes, exams, fees,
    announcements, notices, chat
)

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(students.router)
api_router.include_router(teachers.router)
api_router.include_router(departments.router)
api_router.include_router(programs.router)
api_router.include_router(semesters.router)
api_router.include_router(courses.router)
api_router.include_router(offerings.router)
api_router.include_router(enrollments.router)
api_router.include_router(attendance.router)
api_router.include_router(assignments.router)
api_router.include_router(quizzes.router)
api_router.include_router(exams.router)
api_router.include_router(fees.router)
api_router.include_router(announcements.router)
api_router.include_router(notices.router)
api_router.include_router(chat.router)