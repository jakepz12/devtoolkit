from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.utils.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.article import Article
from app.schemas.article import (
    ArticleCreate,
    ArticleResponse,
    ArticleListResponse,
    ProgressUpdate,
)

router = APIRouter()


@router.get("/", response_model=List[ArticleListResponse])
async def get_articles(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Article)
        .where(Article.user_id == current_user.id)
        .order_by(Article.created_at.desc())
    )
    return result.scalars().all()


@router.get("/{article_id}", response_model=ArticleResponse)
async def get_article(
    article_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Article).where(
            Article.id == article_id,
            Article.user_id == current_user.id,
        )
    )
    article = result.scalar_one_or_none()

    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    return article


@router.post("/", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED)
async def add_article(
    data: ArticleCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Parse article content
    from app.services.parser import parse_article

    try:
        parsed = await parse_article(data.url)
    except Exception:
        parsed = {
            "title": None,
            "content": None,
            "author": None,
            "word_count": 0,
            "reading_time_minutes": 0,
        }

    article = Article(
        user_id=current_user.id,
        url=data.url,
        title=parsed.get("title"),
        content=parsed.get("content"),
        author=parsed.get("author"),
        word_count=parsed.get("word_count", 0),
        reading_time_minutes=parsed.get("reading_time_minutes", 0),
    )
    db.add(article)
    await db.commit()
    await db.refresh(article)
    return article


@router.put("/{article_id}/progress", response_model=ArticleResponse)
async def update_progress(
    article_id: str,
    data: ProgressUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Article).where(
            Article.id == article_id,
            Article.user_id == current_user.id,
        )
    )
    article = result.scalar_one_or_none()

    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    article.read_progress = data.progress
    if data.progress >= 1.0:
        article.is_read = True

    await db.commit()
    await db.refresh(article)
    return article


@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_article(
    article_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Article).where(
            Article.id == article_id,
            Article.user_id == current_user.id,
        )
    )
    article = result.scalar_one_or_none()

    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    await db.delete(article)
    await db.commit()
