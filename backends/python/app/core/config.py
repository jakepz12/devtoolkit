from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "DevToolKit"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/devtoolkit"
    REDIS_URL: str = "redis://localhost:6379/0"

    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    JWT_SECRET: str = "dev-secret-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 60

    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://devtoolkit.app",
    ]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
