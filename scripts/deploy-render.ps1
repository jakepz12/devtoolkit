# DevToolKit Render Deployment Script
# Run this script to deploy backend to Render

Write-Host "🚀 Deploying DevToolKit Backend to Render..." -ForegroundColor Cyan

Write-Host "📋 Instructions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to https://render.com" -ForegroundColor White
Write-Host "2. Click 'New' → 'Web Service'" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Configure:" -ForegroundColor White
Write-Host "   - Name: devtoolkit-api" -ForegroundColor Cyan
Write-Host "   - Runtime: Python" -ForegroundColor Cyan
Write-Host "   - Build Command: cd backends/python && pip install -r requirements.txt" -ForegroundColor Cyan
Write-Host "   - Start Command: cd backends/python && uvicorn app.main:app --host 0.0.0.0 --port `$PORT" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Add Environment Variables:" -ForegroundColor White
Write-Host "   DATABASE_URL=postgresql://..." -ForegroundColor Cyan
Write-Host "   REDIS_URL=redis://..." -ForegroundColor Cyan
Write-Host "   JWT_SECRET=your-secret" -ForegroundColor Cyan
Write-Host "   ALLOWED_ORIGINS=[\"https://your-app.vercel.app\"]" -ForegroundColor Cyan
Write-Host ""
Write-Host "6. Click 'Create Web Service'" -ForegroundColor White
Write-Host ""
Write-Host "✅ After deployment, you'll get a URL like: https://devtoolkit-api.onrender.com" -ForegroundColor Green
