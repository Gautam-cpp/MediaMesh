import enum
from pydantic import  Field, BaseModel
from models.content import ContentTypeEnum
from typing import List

class contentSchema(BaseModel):
    link: str
    content_type: ContentTypeEnum
    title: str = Field(..., min_length=3, max_length=50)
    tags: List[str]
