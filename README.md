# DevToolKit

B2B SaaS платформа для разработчиков и дизайнеров. Три продукта в одном месте: Portfolio Constructor, Retro Board, Article Reader.

## Продукты

### Portfolio Constructor
Конструктор портфолио для разработчиков и дизайнеров. Заполняешь форму — получаешь публичную страницу с SEO-оптимизацией.

### Retro Board
Анонимные ретроспективы в реальном времени. Шаблоны (Start/Stop/Continue, 4Ls, Mad/Sad/Glad, Sailboat), голосование, drag & drop, экспорт в PDF.

### Article Reader
Читалка статей с прогрессом чтения, тегами, папками и оффлайн-режимом (PWA).

## Технологии

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: Tailwind CSS 4 + shadcn/ui
- **Анимации**: Framer Motion
- **State**: Zustand + TanStack Query

### Backend
- **Framework**: FastAPI (Python 3.12)
- **ORM**: SQLAlchemy 2.0
- **БД**: PostgreSQL 16
- **Кэш**: Redis 7

### Инфраструктура
- **Frontend**: Vercel (бесплатный tier)
- **Backend**: Render (бесплатный tier)
- **БД**: Supabase (бесплатный tier)
- **Docker**: Docker Compose для локальной разработки

## Быстрый старт

### Предварительные требования
- Node.js 20+
- Python 3.12+
- Docker Desktop
- Git

### Установка

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd devtoolkit

# Установите зависимости
pnpm install

# Запустите Docker (PostgreSQL + Redis)
docker compose up -d

# Запустите frontend
pnpm dev

# Запустите backend (в отдельном терминале)
cd backends/python
python -m uvicorn app.main:app --reload
```

### Доступ

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/docs

## Структура проекта

```
devtoolkit/
├── apps/
│   └── web/                    # Next.js приложение
├── packages/
│   ├── ui/                     # Общие UI компоненты
│   ├── types/                  # Общие TypeScript типы
│   └── utils/                  # Общие утилиты
├── backends/
│   └── python/                 # FastAPI бэкенд
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## Документация

- [PLAN.md](./PLAN.md) - Полный план разработки
- [API Documentation](http://localhost:8000/docs) - Swagger UI

## Лицензия

MIT
