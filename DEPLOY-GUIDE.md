# 🚀 Пошаговый деплой DevToolKit

## Предварительные требования

- GitHub аккаунт
- Vercel аккаунт (бесплатный)
- Render аккаунт (бесплатный)
- Supabase аккаунт (бесплатный)

---

## Шаг 1: Push на GitHub

```bash
cd D:\b2bsaasaiapp
git remote add origin https://github.com/your-username/devtoolkit.git
git push -u origin main
```

---

## Шаг 2: Supabase (База данных)

1. Перейдите на https://supabase.com
2. Нажмите "New Project"
3. Заполните:
   - Organization: создайте новую
   - Project name: `devtoolkit`
   - Database Password: придумайте пароль
   - Region: US East (или ближайший)
4. Нажмите "Create new project"
5. Дождитесь создания (1-2 минуты)
6. Перейдите в Settings → Database
7. Скопируйте URI подключения:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
8. Перейдите в Settings → API
9. Скопируйте:
   - Project URL: `https://xxxxx.supabase.co`
   - anon public key: `eyJhbG...`
   - service_role key: `eyJhbG...`

---

## Шаг 3: Vercel (Frontend)

1. Перейдите на https://vercel.com
2. Нажмите "Add New..." → "Project"
3. Импортируйте GitHub репозиторий `devtoolkit`
4. Настройте проект:
   - Framework Preset: Next.js
   - Root Directory: `apps/web`
   - Build Command: `pnpm install && pnpm build`
   - Install Command: `pnpm install`
5. Добавьте Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

6. Нажмите "Deploy"
7. Дождитесь деплоя (2-3 минуты)
8. Скопируйте URL: `https://devtoolkit-xxxxx.vercel.app`

---

## Шаг 4: Render (Backend)

1. Перейдите на https://render.com
2. Нажмите "New" → "Web Service"
3. Подключите GitHub репозиторий
4. Настройте:
   - Name: `devtoolkit-api`
   - Runtime: Python 3
   - Build Command: `cd backends/python && pip install -r requirements.txt`
   - Start Command: `cd backends/python && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Добавьте Environment Variables:

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-key-here
ALLOWED_ORIGINS=["https://devtoolkit-xxxxx.vercel.app"]
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

6. Нажмите "Create Web Service"
7. Дождитесь деплоя (5-10 минут)
8. Скопируйте URL: `https://devtoolkit-api.onrender.com`

---

## Шаг 5: Обновите Vercel Environment Variables

1. Перейдите в Vercel Dashboard → your project → Settings → Environment Variables
2. Обновите `NEXT_PUBLIC_API_URL` на ваш Render URL:
   ```
   NEXT_PUBLIC_API_URL=https://devtoolkit-api.onrender.com
   ```
3. Нажмите "Redeploy"

---

## Шаг 6: Настройка аутентификации

### Google OAuth

1. Перейдите на https://console.cloud.google.com
2. Создайте новый проект
3. Перейдите в APIs & Services → Credentials
4. Создайте OAuth 2.0 Client ID
5. Добавьте Redirect URIs:
   - `https://xxxxx.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback`
6. Скопируйте Client ID и Client Secret
7. В Supabase Dashboard → Authentication → Providers → Google
8. Вставьте Client ID и Client Secret

### GitHub OAuth

1. Перейдите на https://github.com/settings/developers
2. Создайте New OAuth App
3. Добавьте Authorization callback URL:
   - `https://xxxxx.supabase.co/auth/v1/callback`
4. Скопируйте Client ID и Client Secret
5. В Supabase Dashboard → Authentication → Providers → GitHub
6. Вставьте Client ID и Client Secret

---

## Шаг 7: Stripe (опционально)

1. Перейдите на https://dashboard.stripe.com
2. Создайте аккаунт
3. Перейдите в Developers → API keys
4. Скопируйте:
   - Publishable key: `pk_test_xxx`
   - Secret key: `sk_test_xxx`
5. Перейдите в Developers → Webhooks
6. Добавьте endpoint: `https://devtoolkit-api.onrender.com/api/v1/billing/webhook`
7. Выберите события: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
8. Скопируйте Signing secret: `whsec_xxx`
9. Добавьте в Vercel и Render Environment Variables

---

## Шаг 8: Проверка

1. Откройте https://devtoolkit-xxxxx.vercel.app
2. Зарегистрируйтесь через Google/GitHub/Email
3. Создайте портфолио
4. Добавьте проекты, навыки, опыт
5. Опубликуйте портфолио
6. Проверьте публичную страницу
7. Создайте ретроспективу
8. Добавьте статью в читалку

---

## Troubleshooting

### Backend не запускается
- Проверьте Environment Variables в Render
- Проверьте логи в Render Dashboard
- Убедитесь, что DATABASE_URL правильный

### Frontend не подключается к backend
- Проверьте NEXT_PUBLIC_API_URL в Vercel
- Убедитесь, что CORS настроен правильно
- Проверьте логи в Vercel Dashboard

### Аутентификация не работает
- Проверьте Redirect URIs в Supabase
- Убедитесь, что OAuth providers включены
- ПроверьтеEnvironment Variables
