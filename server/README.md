# Smart Coach Backend API

Node.js/Express backend with Supabase integration for authentication and data storage.

## Setup Instructions

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready (takes a few minutes)

### 2. Get Supabase Credentials

1. Go to Project Settings → API
2. Copy the following:
   - **Project URL** (SUPABASE_URL)
   - **anon/public key** (SUPABASE_ANON_KEY)
   - **service_role key** (SUPABASE_SERVICE_ROLE_KEY) - Keep this secret!

### 3. Set Up Database

1. Go to SQL Editor in Supabase dashboard
2. Copy and paste the contents of `database/schema.sql`
3. Run the SQL script
4. This will create the `users`, `profiles`, and `favorites` tables

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=generate_a_random_string_here
   FRONTEND_URL=http://localhost:8100
   ```

### 5. Install Dependencies

```bash
cd server
npm install
```

### 6. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user (requires Bearer token)
  ```
  Authorization: Bearer <token>
  ```

- `GET /api/auth/verify` - Verify token validity
  ```
  Authorization: Bearer <token>
  ```

## Security Notes

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens expire after 7 days
- CORS is configured for the frontend URL
- Service role key is used server-side only (never expose to client)

## Troubleshooting

- **Connection errors**: Check your Supabase URL and keys
- **Database errors**: Make sure you ran the schema.sql script
- **CORS errors**: Update FRONTEND_URL in .env to match your frontend
