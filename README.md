# DevToolKit

B2B SaaS платформа для разработчиков и дизайнеров. Три продукта в одном месте: Portfolio Constructor, Retro Board, Article Reader.

## Продукты

### Portfolio Constructor
Конструктор портфолио для разработчиков и дизайнеров. Заполняешь форму — получаешь публичную страницу с SEO-оптимизацией.

**Фичи:**
- 4 темы оформления (Neon Dark, Minimal, Gradient, Monochrome)
- CRUD для проектов, навыков, опыта
- SSR рендеринг для SEO
- Кастомные URL (portfolio.devtoolkit.app/username)
- Аналитика просмотров

### Retro Board
Анонимные ретроспективы в реальном времени. Шаблоны (Start/Stop/Continue, 4Ls, Mad/Sad/Glad, Sailboat), голосование, drag & drop, экспорт в PDF.

**Фичи:**
- 4 шаблона ретроспектив
- Real-time обновления
- Анонимность участников
- Drag & drop карточек
- Голосование за карточки
- Таймер
- Экспорт в PDF
- Share code для приглашения

### Article Reader
Читалка статей с прогрессом чтения, тегами, папками и оффлайн-режимом (PWA).

**Фичи:**
- Автоматический парсинг статей
- Прогресс чтения
- Теги и папки
- Поиск по статьям
- PWA с оффлайн-режимом
- Настраиваемый размер шрифта

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
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   ├── components/     # React компоненты
│       │   ├── hooks/          # Custom hooks
│       │   ├── lib/            # Утилиты
│       │   ├── stores/         # Zustand stores
│       │   └── styles/         # Глобальные стили
│       └── public/             # Статические файлы
│
├── packages/
│   ├── ui/                     # Общие UI компоненты
│   ├── types/                  # Общие TypeScript типы
│   └── utils/                  # Общие утилиты
│
├── backends/
│   └── python/                 # FastAPI бэкенд
│       ├── app/
│       │   ├── api/            # API endpoints
│       │   ├── core/           # Конфигурация
│       │   ├── models/         # SQLAlchemy модели
│       │   ├── schemas/        # Pydantic схемы
│       │   ├── services/       # Business logic
│       │   └── utils/          # Утилиты
│       └── tests/              # Тесты
│
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Регистрация
- `POST /api/v1/auth/login` - Вход

### Portfolio
- `GET /api/v1/portfolio/` - Список портфолио
- `GET /api/v1/portfolio/slug/:slug` - Публичное портфолио
- `POST /api/v1/portfolio/` - Создание портфолио
- `PUT /api/v1/portfolio/:id` - Обновление портфолио
- `DELETE /api/v1/portfolio/:id` - Удаление портфолио

### Articles
- `GET /api/v1/articles/` - Список статей
- `POST /api/v1/articles/` - Добавление статьи
- `PUT /api/v1/articles/:id/progress` - Обновление прогресса
- `DELETE /api/v1/articles/:id` - Удаление статьи

### Tags
- `GET /api/v1/tags/` - Список тегов
- `POST /api/v1/tags/` - Создание тега
- `DELETE /api/v1/tags/:id` - Удаление тега

### Folders
- `GET /api/v1/folders/` - Список папок
- `POST /api/v1/folders/` - Создание папки
- `DELETE /api/v1/folders/:id` - Удаление папки

### Retro
- `POST /api/v1/retro/` - Создание ретро
- `GET /api/v1/retro/:id` - Получение ретро
- `POST /api/v1/retro/:id/cards` - Добавление карточки
- `POST /api/v1/retro/:id/cards/:card_id/vote` - Голосование

### Health
- `GET /health` - Health check
- `GET /health/ready` - Readiness check
- `GET /health/live` - Liveness check

## Лицензия

MIT
