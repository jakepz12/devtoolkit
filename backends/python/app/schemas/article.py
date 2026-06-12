from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime


class ArticleCreate(BaseModel):
    url: str


class ArticleResponse(BaseModel):
    id: UUID
    url: str
    title: Optional[str]
    content: Optional[str]
    author: Optional[str]
    word_count: Optional[int]
    reading_time_minutes: Optional[int]
    is_read: bool
    read_progress: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ArticleListResponse(BaseModel):
    id: UUID
    url: str
    title: Optional[str]
    author: Optional[str]
    word_count: Optional[int]
    reading_time_minutes: Optional[int]
    is_read: bool
    read_progress: float
    created_at: datetime

    class Config:
        from_attributes = True


class TagBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    color: Optional[str] = None


class TagCreate(TagBase):
    pass


class TagResponse(TagBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class FolderBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    parent_id: Optional[UUID] = None


class FolderCreate(FolderBase):
    pass


class FolderResponse(FolderBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class ProgressUpdate(BaseModel):
    progress: float = Field(..., ge=0, le=1)
