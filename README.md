# Node.js Backend Project

---

## Table of Contents


1. [Running the Project](#running-the-project)
2. [Database Migrations](#database-migrations)
3. [Testing](#testing)


## Project Setup

#### Clone the repository:

git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

#### Install dependencies:

npm install
---

## Running the Project

* Start the development server:

```bash
npm run dev
```

* Start the production server:

```bash
npm start
```

* The server will run on `http://localhost:8000` by default.

---

## Database Migrations

### 1. Create a new migration

For Prisma:

```bash
npx prisma migrate dev --name <migration_name>
```

### 2. Execute migrations

For Prisma:

```bash
npx prisma migrate deploy




## Testing

* Run unit tests:

```bash
npm test
```

---