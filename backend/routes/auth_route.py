from controllers.auth_controller import signup, login, isValidUser
from schema.user import UserSchema, UserLoginSchema
from session_Dependency import SessionDep
from fastapi import Depends
from typing import Annotated
from utils.token import oauth2_scheme


from fastapi import APIRouter

auth_router = APIRouter(prefix="/api/v1/auth")

@auth_router.post("/signup")
def Signup(user: UserSchema, session: SessionDep ):
    return signup(user, session)

@auth_router.post("/login")
def Login(user: UserLoginSchema, session: SessionDep):
    return login(user, session)

@auth_router.get("/validate")
def Validate(token: Annotated[str, Depends(oauth2_scheme)], session: SessionDep):
    return isValidUser(token, session)