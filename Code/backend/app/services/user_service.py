from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.user import User, StudentProfile, TeacherProfile, AdminProfile
from app.core.security import hash_password
from app.services.auth_service import AuthService

class UserService:

    # ─── STUDENT ──────────────────────────────────────
    @staticmethod
    def create_student(db: Session, data: dict):
        # Check email already exist
        if db.query(User).filter(User.email == data["email"]).first():
            return None, "Email already exists"

        # Check roll number
        if db.query(User).filter(User.roll_number == data["roll_number"]).first():
            return None, "Roll number already exists"

        # Temp password generate karo
        temp_password = AuthService.generate_temp_password()

        # User banao
        user = User(
            email=data["email"],
            roll_number=data["roll_number"],
            password_hash=hash_password(temp_password),
            role="student"
        )
        db.add(user)
        db.flush()  # ID milne ke liye

        # Profile banao
        profile = StudentProfile(
            user_id=user.id,
            full_name=data["full_name"],
            father_name=data.get("father_name"),
            date_of_birth=data.get("date_of_birth"),
            gender=data.get("gender"),
            cnic=data.get("cnic"),
            phone=data.get("phone"),
            current_address=data.get("current_address"),
            city=data.get("city"),
            guardian_phone=data.get("guardian_phone"),
        )
        db.add(profile)
        db.commit()
        db.refresh(user)

        return {
            "user": user,
            "temp_password": temp_password  # Admin ko dikhao
        }, None

    @staticmethod
    def get_students(db: Session, page: int = 1, per_page: int = 20):
        offset = (page - 1) * per_page
        total = db.query(func.count(User.id)).filter(User.role == "student").scalar()
        
        students = (
            db.query(User)
            .filter(User.role == "student")
            .offset(offset)
            .limit(per_page)
            .all()
        )
        
        return students, total

    @staticmethod
    def get_student_by_id(db: Session, student_id: int):
        return (
            db.query(User)
            .filter(User.id == student_id, User.role == "student")
            .first()
        )

    @staticmethod
    def update_student(db: Session, student_id: int, data: dict):
        user = db.query(User).filter(
            User.id == student_id, User.role == "student"
        ).first()
        
        if not user:
            return None, "Student not found"
        
        profile = user.student_profile
        for key, value in data.items():
            if value is not None and hasattr(profile, key):
                setattr(profile, key, value)
        
        db.commit()
        return user, None

    @staticmethod
    def toggle_student_status(db: Session, student_id: int):
        user = db.query(User).filter(
            User.id == student_id, User.role == "student"
        ).first()
        
        if not user:
            return None, "Student not found"
        
        user.is_active = not user.is_active
        db.commit()
        return user, None

    # ─── TEACHER ──────────────────────────────────────
    @staticmethod
    def create_teacher(db: Session, data: dict):
        if db.query(User).filter(User.email == data["email"]).first():
            return None, "Email already exists"

        temp_password = AuthService.generate_temp_password()

        user = User(
            email=data["email"],
            password_hash=hash_password(temp_password),
            role="teacher"
        )
        db.add(user)
        db.flush()

        profile = TeacherProfile(
            user_id=user.id,
            employee_id=data["employee_id"],
            full_name=data["full_name"],
            designation=data.get("designation"),
            qualification=data.get("qualification"),
            specialization=data.get("specialization"),
            joining_date=data.get("joining_date"),
            phone=data.get("phone"),
            cnic=data.get("cnic"),
        )
        db.add(profile)
        db.commit()
        db.refresh(user)

        return {"user": user, "temp_password": temp_password}, None
    
    # user_service.py mein ye methods add karo

    @staticmethod
    def get_teachers(db: Session, page: int = 1, per_page: int = 20):
        offset = (page - 1) * per_page
        total = db.query(func.count(User.id)).filter(
            User.role == "teacher"
        ).scalar()
        
        teachers = (
            db.query(User)
            .filter(User.role == "teacher")
            .offset(offset)
            .limit(per_page)
            .all()
        )
        return teachers, total

    @staticmethod
    def get_teacher_by_id(db: Session, teacher_id: int):
        return (
            db.query(User)
            .filter(User.id == teacher_id, User.role == "teacher")
            .first()
        )

    @staticmethod
    def update_teacher(db: Session, teacher_id: int, data: dict):
        user = db.query(User).filter(
            User.id == teacher_id, User.role == "teacher"
        ).first()
        
        if not user:
            return None, "Teacher not found"
        
        profile = user.teacher_profile
        allowed_fields = [
            "designation", "qualification",
            "specialization", "phone", "address"
        ]
        for key in allowed_fields:
            if key in data and data[key] is not None:
                setattr(profile, key, data[key])
        
        db.commit()
        return user, None

    @staticmethod
    def toggle_teacher_status(db: Session, teacher_id: int):
        user = db.query(User).filter(
            User.id == teacher_id, User.role == "teacher"
        ).first()
        
        if not user:
            return None, "Teacher not found"
        
        user.is_active = not user.is_active
        db.commit()
        return user, None