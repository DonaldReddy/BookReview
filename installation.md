# 📚 BookReview - INSTALLATION GUIDE

Welcome! This guide walks you through setting up the BookReview project locally for development and testing.

📁 Project Structure

```
BookReview/
├── .github/                # GitHub workflows and configs
├── Backend/                # Backend (Express.js + Prisma)
│   ├── controller/         # Request handlers
│   ├── database/           # DB connection logic
│   ├── middleware/         # Auth and error handling
│   ├── prisma/             # Prisma schema and migrations
│   ├── repository/         # DB query logic (e.g., books, users)
│   ├── routes/             # API route definitions
│   ├── service/            # Business logic
│   ├── utils/              # Helper functions
│   ├── .env.example        # Sample environment variables
│   ├── index.js            # Entry point for the server
│   ├── package.json        # Backend dependencies
│   └── package-lock.json
├── Frontend/               # Frontend (React + Tailwind)
│   ├── public/             # Static assets
│   ├── src/                # Main React source code
│   ├── .env.example        # Sample frontend env file
│   ├── eslint.config.js    # ESLint configuration
│   ├── package.json        # Frontend dependencies
│   ├── package-lock.json
│   ├── tsconfig.json       # TypeScript config
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts      # Vite bundler config
├── .gitignore              # Ignore rules
├── CODE_OF_CONDUCT.md      # Contributor behavior rules
├── CONTRIBUTION.md         # Contribution guide
├── README.md               # Main project documentation
└── installation.md         # Local setup instructions

```

---

## 🛠 Prerequisites

Make sure you have the following installed and ready:

- **Node.js** v16 or later (includes `npm`; you can also use **yarn**)
- **Git**
- **PostgreSQL** (for the backend database)
- Optionally:
- **nodemon** (auto-restarts backend server in dev)
- **concurrently** (to run frontend & backend together)
- **Postman** or **Insomnia** for API testing

---

## 🔐 Setting Up Environment Variables

Create .env files in both frontend/ and backend/ directories with the following environment variables.

### Backend(`backend/.env`)

FRONTEND_URL=http://localhost:5173

JWT_SECRET= # add your JWT secret here

PORT=5000

DATABASE_URL= # add your postgresql database URL here
GOOGLE_CLIENT_ID= # your_google_client_id
GOOGLE_CLIENT_SECRET= # your_google_client_secret

AI_KEY= # add your OpenRouter API key here
AI_MODEL= # add your OpenRouter model here (e.g., "gpt-3.5-turbo")

# Email Configuration (for password reset)

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER= # your_gmail_address@gmail.com
EMAIL_PASS= # your_16_character_gmail_app_password
EMAIL_FROM= # your_gmail_address@gmail.com (same as EMAIL_USER)

### Frontend(`frontend/.env`)

VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID= # your_google_client_id
VITE_GOOGLE_CLIENT_SECRET= # your_google_client_secret
=======
## 🎨 Frontend Setup

```bash
cd frontend
```

```bash
copy .env.example .env
```

Update the `.env` file with your environment variables (e.g., API URL).

```bash
npm install
```

```bash
npm run dev
```

React app will typically run at : http://localhost:5173/

## 🛠 Backend Setup

```bash
cd backend
```

```bash
copy .env.example .env
```

Update the `.env` file with your database connection details and other environment variables.

```bash
npm install
```

```bash
npm run dev
```

Backend API will typically run at : http://localhost:5000/api

## 🗃 Database Setup

1. Create a PostgreSQL database for the project (can use pgAdmin or [neon db](https://neon.com/)).
2. Update the `DATABASE_URL` in the `.env` file with your database connection string.
3. Run the following command to create the database schema:

```bash
npx prisma generate
```

this will generate the Prisma client based on your schema.

4. Run the migration to update the database schema( only if you have made changes to the Prisma schema):

```bash
npx prisma migrate dev --name migration_name
```

This will apply the latest schema changes to your database.
