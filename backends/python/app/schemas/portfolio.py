from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime


class ProjectBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    technologies: Optional[List[str]] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: UUID
    sort_order: int

    class Config:
        from_attributes = True


class PortfolioSectionBase(BaseModel):
    type: str = Field(..., pattern="^(projects|skills|experience|contact)$")
    title: str = Field(..., min_length=1, max_length=255)
    content: Optional[dict] = None
    sort_order: int = 0


class PortfolioSectionCreate(PortfolioSectionBase):
    pass


class PortfolioSectionResponse(PortfolioSectionBase):
    id: UUID

    class Config:
        from_attributes = True


class PortfolioBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    bio: Optional[str] = None
    theme: str = Field(default="neon-dark", pattern="^(neon-dark|minimal|gradient|monochrome)$")
    slug: str = Field(..., min_length=3, max_length=100, pattern="^[a-z0-9-]+$")
    is_public: bool = True


class PortfolioCreate(PortfolioBase):
    sections: Optional[List[PortfolioSectionCreate]] = None
    projects: Optional[List[ProjectCreate]] = None


class PortfolioUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    bio: Optional[str] = None
    theme: Optional[str] = Field(None, pattern="^(neon-dark|minimal|gradient|monochrome)$")
    is_public: Optional[bool] = None


class PortfolioResponse(PortfolioBase):
    id: UUID
    user_id: UUID
    views_count: int
    created_at: datetime
    updated_at: datetime
    sections: List[PortfolioSectionResponse] = []
    projects: List[ProjectResponse] = []

    class Config:
        from_attributes = True


class PortfolioPublicResponse(BaseModel):
    id: UUID
    title: str
    bio: Optional[str]
    theme: str
    slug: str
    views_count: int
    created_at: datetime
    sections: List[PortfolioSectionResponse] = []
    projects: List[ProjectResponse] = []

    class Config:
        from_attributes = True
