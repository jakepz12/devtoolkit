# Деплой DevToolKit

## Пошаговая инструкция

### Шаг 1: Supabase (База данных)

1. Зайдите на https://supabase.com
2. Создайте новый проект
3. Выберите регион (US East recommended)
4. Запишите credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJhbG...`
   - Service Role Key: `eyJhbG...`

### Шаг 2: Vercel (Frontend)

1. Зайдите на https://vercel.com
2. Импортируйте GitHub репозиторий
3. Настройте Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

4. Deploy

### Шаг 3: Render (Backend)

1. Зайдите на https://render.com
2. Создайте new Web Service
3. Подключите GitHub репозиторий
4. Настройте:
   - Build Command: `cd backends/python && pip install -r requirements.txt`
   - Start Command: `cd backends/python && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Настройте Environment Variables:

```
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=["https://your-app.vercel.app"]
```

### Шаг 4: Stripe (Payments) - опционально

1. Зайдите на https://stripe.com
2. Создайте аккаунт
3. Получите API keys
4. Настройте в Environment Variables:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Шаг 5: Настройка аутентификации

1. В Supabase Dashboard:
   - Authentication → Providers
   - Включите Google OAuth
   - Включите GitHub OAuth
2. Добавьте Redirect URLs:
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback`

### Шаг 6: Проверка

1. Откройте https://your-app.vercel.app
2. Зарегистрируйтесь
3. Создайте портфолио
4. Проверьте публичную страницу
