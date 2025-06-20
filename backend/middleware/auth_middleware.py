from fastapi import  Request, HTTPException

import jwt
from models.user import User

from sqlmodel import select, Session
from database import engine
from uuid import UUID
from session_Dependency import app
from config import settings

@app.middleware("http")
async def verify_jwt(request: Request, call_next):

    public_paths = ["/api/v1/auth/login", "/api/v1/auth/signup", "/docs" , "/redoc", "/openapi.json"]

    if request.url.path in public_paths:
        return await call_next(request)

    
    token = request.cookies.get("access_token")
    
    if not token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.replace("Bearer ", "")
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
       
        payload = jwt.decode(token, settings.SECRET_KEY , algorithms=settings.ALGORITHM)

        user_id = UUID(payload.get("sub"))  
        if not user_id:
            raise ValueError("Invalid token payload")
        
        with Session(engine) as session:
            user = session.exec(select(User).where(User.id == user_id)).first()
            
            if not user:
                raise HTTPException(status_code=401, detail="Invalid token")
    
            request.state.user = user

        
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    response = await call_next(request)
    
    return response


def get_current_user(request: Request) -> User:
    print(request)
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=401, detail="User not authenticated")
    return user

