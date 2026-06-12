from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List

from app.utils.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.portfolio import Portfolio
from app.schemas.portfolio import (
    PortfolioCreate,
    PortfolioUpdate,
    PortfolioResponse,
    PortfolioPublicResponse,
)

router = APIRouter()


@router.get("/", response_model=List[PortfolioResponse])
async def get_portfolios(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Portfolio)
        .options(selectinload(Portfolio.sections))
        .options(selectinload(Portfolio.projects))
        .where(Portfolio.user_id == current_user.id)
        .order_by(Portfolio.created_at.desc())
    )
    return result.scalars().all()


@router.get("/slug/{slug}", response_model=PortfolioPublicResponse)
async def get_portfolio_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Portfolio)
        .options(selectinload(Portfolio.sections))
        .options(selectinload(Portfolio.projects))
        .where(Portfolio.slug == slug, Portfolio.is_public == True)
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    portfolio.views_count += 1
    await db.commit()

    return portfolio


@router.post("/", response_model=PortfolioResponse, status_code=status.HTTP_201_CREATED)
async def create_portfolio(
    data: PortfolioCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing = await db.execute(select(Portfolio).where(Portfolio.slug == data.slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already taken")

    portfolio = Portfolio(
        user_id=current_user.id,
        title=data.title,
        bio=data.bio,
        theme=data.theme,
        slug=data.slug,
        is_public=data.is_public,
    )
    db.add(portfolio)
    await db.commit()
    await db.refresh(portfolio)
    return portfolio


@router.put("/{portfolio_id}", response_model=PortfolioResponse)
async def update_portfolio(
    portfolio_id: str,
    data: PortfolioUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Portfolio).where(Portfolio.id == portfolio_id)
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio or portfolio.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(portfolio, key, value)

    await db.commit()
    await db.refresh(portfolio)
    return portfolio


@router.delete("/{portfolio_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_portfolio(
    portfolio_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Portfolio).where(Portfolio.id == portfolio_id)
    )
    portfolio = result.scalar_one_or_none()

    if not portfolio or portfolio.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    await db.delete(portfolio)
    await db.commit()
