from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api import auth, portfolio, articles, retro, health, tags, folders
from app.utils.database import engine, Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title=settings.APP_NAME,
    description="B2B SaaS platform for developers",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(portfolio.router, prefix="/api/v1/portfolio", tags=["portfolio"])
app.include_router(articles.router, prefix="/api/v1/articles", tags=["articles"])
app.include_router(retro.router, prefix="/api/v1/retro", tags=["retro"])
app.include_router(tags.router, prefix="/api/v1/tags", tags=["tags"])
app.include_router(folders.router, prefix="/api/v1/folders", tags=["folders"])
app.include_router(health.router, tags=["health"])


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
