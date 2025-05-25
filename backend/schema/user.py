import re
from pydantic import BaseModel, EmailStr, field_validator, Field


class UserSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=10)
    email: EmailStr 
    password: str

    @field_validator("password")
    def strong_password(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Must contain at least one lowercase letter")
        if not re.search(r"[0-9]", v):
            raise ValueError("Must contain at least one digit")
        if not re.search(r"[@$!%*?&]", v):
            raise ValueError("Must contain at least one special character (@$!%*?&)")
        return v

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v
