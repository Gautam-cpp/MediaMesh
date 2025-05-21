from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4

class User(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    username: str = Field(index=True)
    email: str = Field(index=True, unique=True)
    password: str
