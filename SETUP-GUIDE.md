# Настройка DevToolKit — Пошаговая инструкция

## Шаг 1: Supabase (База данных)

### Создание проекта

1. Откройте https://supabase.com
2. Нажмите "New Project"
3. Заполните форму:
   - Organization: создайте новую (или выберите существующую)
   - Project name: `devtoolkit`
   - Database Password: придумайте надёжный пароль (запишите его!)
   - Region: US East (или ближайший к вам)
4. Нажмите "Create new project"
5. Дождитесь создания (1-2 минуты)

### Получение credentials

После создания проекта:

1. Перейдите в **Settings** → **Database**
2. Скопируйте **URI** (это ваш DATABASE_URL):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

3. Перейдите в **Settings** → **API**
4. Скопируйте:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...` (длинная строка)
   - **service_role key**: `eyJhbG...` (длинная строка)

### Настройка аутентификации

1. Перейдите в **Authentication** → **Providers**
2. Включите **Google**:
   - Нажмите "Enable"
   - Следуйте инструкциям для создания Google OAuth credentials
   - Добавьте Client ID и Client Secret
3. Включите **GitHub**:
   - Нажмите "Enable"
   - Следуйте инструкциям для создания GitHub OAuth App
   - Добавьте Client ID и Client Secret

---

## Шаг 2: Render (Backend API)

### Создание аккаунта

1. Откройте https://render.com
2. Зарегистрируйтесь через GitHub

### Создание Web Service

1. Нажмите "New" → "Web Service"
2. Подключите GitHub репозиторий `devtoolkit`
3. Настройте:
   - **Name**: `devtoolkit-api`
   - **Runtime**: Python 3
   - **Build Command**: `cd backends/python && pip install -r requirements.txt`
   - **Start Command**: `cd backends/python && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

4. Добавьте **Environment Variables** (нажмите "Add Environment Variable"):

   | Key | Value |
   |-----|-------|
   | DATABASE_URL | `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres` |
   | REDIS_URL | `redis://localhost:6379` |
   | JWT_SECRET | любой секретный ключ |
   | ALLOWED_ORIGINS | `["https://web-peach-phi-15.vercel.app"]` |

5. Нажмите "Create Web Service"
6. Дождитесь деплоя (5-10 минут)
7. Скопируйте URL (например: `https://devtoolkit-api.onrender.com`)

---

## Шаг 3: Обновление Vercel Environment Variables

1. Перейдите в https://vercel.com → ваш проект → **Settings** → **Environment Variables**
2. Добавьте/обновите:

   | Key | Value |
   |-----|-------|
   | NEXT_PUBLIC_API_URL | `https://devtoolkit-api.onrender.com` |
   | NEXT_PUBLIC_SUPABASE_URL | `https://xxxxx.supabase.co` |
   | NEXT_PUBLIC_SUPABASE_ANON_KEY | `eyJhbG...` (из Supabase) |

3. Нажмите **Save**
4. Перейдите в **Deployments** и нажмите **Redeploy** для обновления

---

## Шаг 4: Настройка Google OAuth

1. Перейдите на https://console.cloud.google.com
2. Создайте новый проект (или выберите существующий)
3. Перейдите в **APIs & Services** → **Credentials**
4. Нажмите **Create Credentials** → **OAuth 2.0 Client ID**
5. Настройте:
   - Application type: Web application
   - Name: DevToolKit
   - Authorized redirect URIs: `https://xxxxx.supabase.co/auth/v1/callback`
6. Скопируйте **Client ID** и **Client Secret**
7. В Supabase Dashboard → Authentication → Providers → Google:
   - Вставьте Client ID и Client Secret
   - Нажмите "Save"

---

## Шаг 5: Настройка GitHub OAuth

1. Перейдите на https://github.com/settings/developers
2. Нажмите **New OAuth App**
3. Настройте:
   - Application name: DevToolKit
   - Homepage URL: `https://web-peach-phi-15.vercel.app`
   - Authorization callback URL: `https://xxxxx.supabase.co/auth/v1/callback`
4. Скопируйте **Client ID** и **Client Secret**
5. В Supabase Dashboard → Authentication → Providers → GitHub:
   - Вставьте Client ID и Client Secret
   - Нажмите "Save"

---

## Шаг 6: Проверка

1. Откройте https://web-peach-phi-15.vercel.app
2. Попробуйте зарегистрироваться через Google или GitHub
3. Если всё работает — поздравляю! 🎉

---

## Решение проблем

### Backend не запускается на Render
- Проверьте логи в Render Dashboard → Logs
- Убедитесь, что DATABASE_URL правильный
- Убедитесь, что пароль от Supabase верный

### Frontend не подключается к backend
- Проверьте NEXT_PUBLIC_API_URL в Vercel
- Убедитесь, что CORS настроен (ALLOWED_ORIGINS)
- Проверьте логи в Vercel Dashboard → Logs

### Аутентификация не работает
- Убедитесь, что Redirect URI правильный в Google/GitHub
- Убедитесь, что providers включены в Supabase
- Проверьте Environment Variables

### Изображения не загружаются
- Пока что изображения хранятся локально
- В production нужно настроить S3/MinIO
