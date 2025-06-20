from controllers.content_controller import add_content, get_content, get_content_by_type, delete_content
from schema.content import contentSchema
from session_Dependency import SessionDep
from fastapi import Depends, Request

from middleware.auth_middleware import get_current_user
from models.user import User
from fastapi import APIRouter


content_router = APIRouter(prefix="/api/v1/content")


@content_router.post("/add")
async def add(request: Request, content: contentSchema, session: SessionDep, current_user: User = Depends(get_current_user)):
    
    return add_content(content, session, current_user)

@content_router.get("/get")
def get(session: SessionDep, current_user: User = Depends(get_current_user)):
    return get_content(session, current_user)

@content_router.get("/get/{content_type}")
def get_by_type(content_type: str, session: SessionDep, current_user: User = Depends(get_current_user)):
    return get_content_by_type(session, current_user, content_type)

@content_router.delete("/delete/{content_id}")
def delete(content_id: int, session: SessionDep, current_user: User = Depends(get_current_user)):
    return delete_content(session, content_id, current_user)



