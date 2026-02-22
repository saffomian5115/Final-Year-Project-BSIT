from fastapi import Depends, Header
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.security import decode_token
from app.utils.response import error_response
from app.models.user import User

async def get_current_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    # Token check
    if not authorization or not authorization.startswith("Bearer "):
        raise Exception("Token missing")
    
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    
    if not payload or payload.get("type") != "access":
        raise Exception("Invalid token")
    
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first()
    
    if not user or not user.is_active:
        raise Exception("User not found or inactive")
    
    return user

# Role check helpers
def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise Exception("Admin access required")
    return current_user

def require_teacher(current_user: User = Depends(get_current_user)):
    if current_user.role not in ["admin", "teacher"]:
        raise Exception("Teacher access required")
    return current_user

def require_student(current_user: User = Depends(get_current_user)):
    if current_user.role != "student":
        raise Exception("Student access required")
    return current_user