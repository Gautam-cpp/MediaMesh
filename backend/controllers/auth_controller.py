from sqlalchemy.exc import IntegrityError
from sqlmodel import select
from fastapi import status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from models.user import User
from utils.hash import get_password_hash, verify_password
from utils.token import create_access_token
import traceback


def signup(user, session):
    try:
        existing_user = session.exec(select(User).where(User.email == user.email)).first()
        if existing_user:
            return JSONResponse(content={"message": "User Already exist"}, status_code=400)
            
        hashed_password = get_password_hash(user.password)
        
        new_user = User(
            username = user.username,
            email = user.email,
            password = hashed_password
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        access_token = create_access_token(data={"sub": str(new_user.id)})
        return JSONResponse(
            content={
                "message": "User Created Successfully",
                "user": jsonable_encoder(new_user.model_dump(exclude={"password"})),
                "access_token": access_token,
                "token_type": "bearer"
            },
            status_code=status.HTTP_201_CREATED
        )
       
   
    except IntegrityError:
        session.rollback()
        print(traceback.format_exc())
        return JSONResponse(content={"message": "Database integrity error (maybe duplicate email?)"}, status_code=status.HTTP_409_CONFLICT)

    except Exception as e:
        session.rollback()
        print(traceback.format_exc())
        return JSONResponse(content={"message": "Unexpected error: " + str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        

def login(user, session):
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if not existing_user:
        return JSONResponse(content={"message": "User not found"}, status_code=status.HTTP_404_NOT_FOUND)
    
    if not verify_password(user.password, existing_user.password):
        return JSONResponse(content={"message": "Incorrect password"}, status_code=status.HTTP_401_UNAUTHORIZED)
    
    access_token = create_access_token(data={"sub": str(existing_user.id)})
    return JSONResponse(
        content={
            "message": "Login successful",
            "user": jsonable_encoder(existing_user.model_dump(exclude={"password"})),
            "access_token": access_token,
            "token_type": "bearer"
        },
        status_code=status.HTTP_200_OK
    )

