from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime


class UserBase(BaseModel):
    email: str = Field(..., min_length=1, max_length=255)
    username: str = Field(..., min_length=3, max_length=50)
    full_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserResponse(UserBase):
    id: UUID
    subscription_tier: str
    created_at: datetime

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: str
    password: str
