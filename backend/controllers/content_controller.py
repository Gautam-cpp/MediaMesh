from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from sqlmodel import select
from models.content import Content
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

def add_content(content, session, current_user):
    print("Adding content:", content)
    try:
        existing_content = session.exec(select(Content).where(Content.user_id == current_user.id).where(Content.link == content.link)).first()
        if existing_content:
            return JSONResponse(content={"message": "Content already exist"}, status_code=status.HTTP_400_BAD_REQUEST) 
        
        new_content = Content(
            link = content.link,
            content_type = content.content_type,
            title = content.title,
            tags = content.tags,
            user_id = current_user.id
        )
        session.add(new_content)
        session.commit()
        session.refresh(new_content)
        return JSONResponse(
            content={
                "message": "Content created successfully",
                "content": jsonable_encoder(new_content)
            },
            status_code=status.HTTP_201_CREATED
        )
    
    except IntegrityError:
        session.rollback()
        return JSONResponse(content={"message": "Database integrity error "}, status_code=status.HTTP_409_CONFLICT)
    

def get_content(session, current_user):
    return session.exec(select(Content).where(Content.user_id == current_user.id)).all()

def get_content_by_type(session, current_user, content_type):
    return session.exec(select(Content).where(Content.user_id == current_user.id).where(Content.content_type == content_type)).all()

def delete_content(session, content_id, current_user):
    content = session.exec(select(Content).where(Content.id == content_id).where(Content.user_id == current_user.id)).first()
    if not content:
        return JSONResponse(content={"message": "Content not found"}, status_code=status.HTTP_404_NOT_FOUND)
    session.delete(content)
    session.commit()
    return JSONResponse(content={"message": "Content deleted successfully"}, status_code=status.HTTP_200_OK)