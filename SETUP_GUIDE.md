# Smart Coach - Complete Setup Guide

## 🚀 Quick Start

This guide will help you set up the complete authentication system with Node.js backend and Supabase database.

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn
- A Supabase account (free tier is fine)
- Ionic CLI (optional, for mobile builds)

---

## 🔧 Backend Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/login
3. Click "New Project"
4. Fill in:
   - **Name**: smart-coach (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for project to be ready

### Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
   - **service_role** key (long string - **KEEP THIS SECRET!**)

### Step 3: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Open `server/database/schema.sql` from this project
4. Copy the entire SQL script
5. Paste it into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Step 4: Configure Backend Environment

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Create `.env` file:
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

3. Open `.env` and fill in your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   JWT_SECRET=generate_a_random_string_here_min_32_chars
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:8100
   ```

   **Generate JWT_SECRET:**
   ```bash
   # On Mac/Linux
   openssl rand -base64 32
   
   # Or use an online generator
   # https://randomkeygen.com/
   ```

### Step 5: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 6: Start Backend Server

```bash
# Development mode (auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
📱 Frontend URL: http://localhost:8100
```

**Keep this terminal open!**

---

## 📱 Frontend Setup

### Step 1: Verify Environment Configuration

The frontend is already configured! Check `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

For production, update `src/environments/environment.prod.ts` with your backend URL.

### Step 2: Start Frontend

Open a **new terminal** (keep backend running):

```bash
# Make sure you're in the project root (not server folder)
npm start
```

Or if using Ionic CLI:
```bash
ionic serve
```

The app will open at `http://localhost:8100`

---

## ✅ Testing the Setup

### Test Backend

1. Open browser: `http://localhost:3000/health`
2. Should see: `{"status":"OK","message":"Smart Coach API is running"}`

### Test Registration

1. Open the app: `http://localhost:8100`
2. You should be redirected to `/login`
3. Click "Register" or go to `/register`
4. Fill in:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
5. Click "Register"
6. Should redirect to home page

### Test Login

1. Logout (from profile page)
2. Login with the same credentials
3. Should work!

---

## 🔍 Troubleshooting

### Backend Issues

**Error: "Missing Supabase environment variables"**
- Check your `.env` file exists in `server/` folder
- Verify all variables are filled in correctly
- Make sure there are no extra spaces

**Error: "Failed to create user"**
- Check Supabase credentials are correct
- Verify you ran the SQL schema script
- Check Supabase project is active

**CORS Errors**
- Make sure `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://localhost:8100`

### Frontend Issues

**Error: "Cannot connect to API"**
- Make sure backend is running on port 3000
- Check `apiUrl` in `environment.ts` matches backend URL
- Check browser console for detailed errors

**Login/Register not working**
- Open browser DevTools → Network tab
- Check if requests are being made
- Look for error responses from backend

### Database Issues

**"Table does not exist"**
- Go to Supabase dashboard → SQL Editor
- Run the schema.sql script again
- Check Tables section to verify tables exist

---

## 📁 Project Structure

```
smartCoach/
├── server/                 # Backend API
│   ├── config/            # Supabase configuration
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── database/          # SQL schema
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
│
├── src/                   # Frontend (Ionic/Angular)
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/  # Auth service (updated)
│   │   │   └── interceptors/ # HTTP interceptor
│   │   └── pages/         # Login, Register pages
│   └── environments/      # API URL configuration
│
└── DATABASE_SETUP.md      # Database info
```

---

## 🔐 Security Notes

- ✅ Passwords are hashed with bcrypt (10 rounds)
- ✅ JWT tokens expire after 7 days
- ✅ Tokens stored securely in Capacitor Preferences
- ✅ CORS configured for frontend only
- ⚠️ Never commit `.env` file (already in .gitignore)
- ⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend

---

## 🚀 Next Steps

1. **Deploy Backend**: Deploy to Heroku, Railway, or Vercel
2. **Deploy Frontend**: Build and deploy Ionic app
3. **Add Features**: Profile management, favorites sync, etc.
4. **Production**: Update environment.prod.ts with production URLs

---

## 📞 Need Help?

- Check Supabase docs: https://supabase.com/docs
- Check backend logs in terminal
- Check browser console for frontend errors
- Verify all environment variables are set correctly

---

**You're all set! 🎉**
