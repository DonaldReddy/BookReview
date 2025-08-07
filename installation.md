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

-   **Node.js** v16 or later (includes `npm`; you can also use **yarn**)
-   **Git**
-   **PostgreSQL** (for the backend database)
-   Optionally:
-   **nodemon** (auto-restarts backend server in dev)
-   **concurrently** (to run frontend & backend together)
-   **Postman** or **Insomnia** for API testing

---

## 🔐 Setting Up Environment Variables

Create .env files in both frontend/ and backend/ directories with the following environment variables.

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

Backend API will typically run at : http://localhost:9999/api

## 🗃 Database Setup

1. **Create PostgreSQL Database**
   - Use pgAdmin or [neon db](https://neon.com/) to create a new PostgreSQL database
   - Note down the database connection details (host, port, database name, username, password)

2. **Configure Environment**
   - Create or update the `.env` file in your project root
   - Add your database connection string in the following format:
     ```bash
     DATABASE_URL="postgresql://username:password@host:port/database_name"
     ```

3. **Generate Prisma Client**
   - Run this command to generate the Prisma client:
     ```bash
     npx prisma generate
     ```
   - This will generate TypeScript types and client code based on your schema

4. **Initial Database Migration**
   - Run the initial migration to create the database schema:
     ```bash
     npx prisma migrate dev --name init
     ```
   - This will create all necessary tables in your database

5. **Adding Books (Admin Access Required)**
   - First, start your application
   - Log in to the website using your credentials
   - Navigate to the user profile settings
   - Change your user role to "admin"
   - After changing to admin role, you can access the admin panel to add books

**Note:** Make sure to backup your database before running migrations, especially when making schema changes.
