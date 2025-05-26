from controllers.auth_controller import signup, login
from schema.user import UserSchema, UserLoginSchema
from session_Dependency import SessionDep
from fastapi import APIRouter

auth_router = APIRouter(prefix="/api/v1/auth")

@auth_router.post("/signup")
def Signup(user: UserSchema, session: SessionDep ):
    return signup(user, session)

@auth_router.post("/login")
def Login(user: UserLoginSchema, session: SessionDep):
    return login(user, session)

