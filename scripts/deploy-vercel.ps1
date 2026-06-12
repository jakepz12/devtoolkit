# DevToolKit Vercel Deployment Script
# Run this script to deploy frontend to Vercel

Write-Host "🚀 Deploying DevToolKit Frontend to Vercel..." -ForegroundColor Cyan

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Check if logged in
$vercelUser = vercel whoami 2>&1
if ($vercelUser -like "*Error*") {
    Write-Host "❌ Not logged in to Vercel. Please run 'vercel login' first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Logged in as: $vercelUser" -ForegroundColor Green

# Deploy to Vercel
Write-Host "📦 Building and deploying..." -ForegroundColor Yellow
cd apps/web
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Check your deployment at: https://your-app.vercel.app" -ForegroundColor Cyan
