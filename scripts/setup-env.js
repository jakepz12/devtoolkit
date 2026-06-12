#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
  console.log('🚀 DevToolKit Setup\n');

  // Supabase
  const supabaseUrl = await question('Supabase URL: ');
  const supabaseKey = await question('Supabase Anon Key: ');
  const supabaseServiceKey = await question('Supabase Service Role Key: ');

  // Backend URL
  const backendUrl = await question('Backend URL (e.g., https://your-app.onrender.com): ');

  // JWT Secret
  const jwtSecret = await question('JWT Secret (or press Enter to generate): ');

  // Generate .env.local for frontend
  const frontendEnv = `# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=${backendUrl || 'http://localhost:8000'}

# Supabase
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}
SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceKey}

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
`;

  // Generate .env for backend
  const backendEnv = `DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/devtoolkit
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=${jwtSecret || 'dev-secret-change-in-production'}
ALLOWED_ORIGINS=["http://localhost:3000","${backendUrl}"]
`;

  // Write files
  fs.writeFileSync(path.join(__dirname, '..', 'apps', 'web', '.env.local'), frontendEnv);
  fs.writeFileSync(path.join(__dirname, '..', 'backends', 'python', '.env'), backendEnv);

  console.log('\n✅ Environment files created!');
  console.log('   - apps/web/.env.local');
  console.log('   - backends/python/.env');

  rl.close();
}

setup().catch(console.error);
