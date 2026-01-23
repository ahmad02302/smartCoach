# Environment Variables Setup

Create a `.env` file in the `server/` folder with the following content:

```env
# Supabase Configuration
# Get these from: https://app.supabase.com/project/YOUR_PROJECT/settings/api
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT Secret (generate a random string, minimum 32 characters)
# Use: openssl rand -base64 32
JWT_SECRET=your_random_secret_string_here

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration (frontend URL)
FRONTEND_URL=http://localhost:8100
```

## How to Get Supabase Credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## Generate JWT Secret:

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Online Generator:**
Visit: https://randomkeygen.com/ and use a CodeIgniter Encryption Keys (256-bit)
