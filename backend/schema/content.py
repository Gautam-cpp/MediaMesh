
from pydantic import   BaseModel
from typing import List

class contentSchema(BaseModel):
    title: str
    link: str
    tags: List[str]
    content_type: str
