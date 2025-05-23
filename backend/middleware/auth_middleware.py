from fastapi import  Request, HTTPException

import jwt
from models.user import User

from sqlmodel import select, Session
from database import engine
from uuid import UUID

from session_Dependency import app



@app.middleware("http")
async def verify_jwt(request: Request, call_next):

    public_paths = ["/api/v1/auth/login", "/api/v1/auth/signup"]

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
       
        payload = jwt.decode(token, "0c2f74a6e981dd16b320e1e3e5b9a06c79817b54371bd79cf21e8443135e1deb", algorithms=["HS256"])

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
    print(response)
    return response
