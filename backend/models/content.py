from sqlmodel import SQLModel, Field
from typing import Optional, List
from enum import Enum
from datetime import datetime
from sqlalchemy import Column, JSON
from uuid import UUID, uuid4

class Content(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    link: str = Field(index=True)  
    content_type: str = Field(index=True)
    title: str = Field(index=True)
    tags: List[str] = Field(sa_column=Column(JSON))
    user_id: UUID = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.now)
