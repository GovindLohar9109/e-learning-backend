# Node.js Backend Project

## Table of Contents

1. [Project Setup](#project-setup)
2. [Running the Project](#running-the-project)
3. [Database Migrations](#database-migrations)
4. [Seeding](#seeding)
5. [Testing](#testing)

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GovindLohar9109/e-learning-backend.git

cd e-learning-backend

### Install Dependencies
npm install

## Database Migrations

### Create a New Migration

npx prisma migrate dev --name <migration_name>

### Execute Migrations (Production)

npx prisma migrate deploy

### Generate Prisma Client

npm run generate
### Sync Schema Without Migrations (Optional)

npm run db:push

### Pull Schema From the Database (Optional)

npm run db:pull

### Seeding
- Run the seed script to populate initial data:

npm run seed
Testing
Run unit tests:

## Testing

npm test

## To start server
node app.js

"scripts": {
  "dev": "nodemon app.js",
  "start": "node app.js",
  "test": "echo \"No tests specified\" && exit 0"
}

## Scripts Used in This Project

"scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "dev": "nodemon src/app",
    "start": "node src/app.js",
    "seed": "npx prisma db seed",

    "seed-revert-courses": "node src/prisma/seed/seed-revert-courses.js",
    "seed-revert-roles": "node src/prisma/seed/seed-revert-roles.js",
    "seed-revert-users": "node src/prisma/seed/seed-revert-users.js",
    "seed-revert-all": "node src/prisma/seed/seed-revert.js",

    "migrate": "prisma migrate dev --name init",
    "migrate:deploy": "prisma migrate deploy",
    "generate": "prisma generate"
  },
```
