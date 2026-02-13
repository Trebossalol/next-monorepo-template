# 🚀 Next Monorepo Template

This is a simple Next.js Monorepo template I use for my projects.

## Todos for this branch
- [ ] Check in which workspaces biomejs needs to be installed
- [ ] Optimize rules for each workspace
- [ ] Format and lint all the workspaces


## ✨ Built-In Features

- 🔐 **Authentication** - Sign in and sign up
- 👤 **Account Management** - Profile & security settings
- 📦 **Example Database Table** - Full CRUD operations with:
  - 📄 Pagination
  - 🔄 Sorting
  - 🔍 Filtering
  - ☑️ Row selection & bulk actions
  - 🔎 Search
  - ⏳ Loading states

## 🛠️ Tech Stack

- ⚡ Turborepo
- ⚛️ Next.js 16 & React 19
- 🎨 Shadcn/UI & Tailwind CSS
- ✅ Next Safe Action
- 📝 React Hook Form
- 🎭 Ebay Nice Modal
- 🔒 Better Auth
- 💾 Prisma

## Architecture

The project is organized into the following directories:

- `apps/web`: The main web application (Next.js)
- `packages/auth`: Authentication logic
- `packages/common`: Shared utilities and constants
- `packages/database`: Prisma database schema and client
- `packages/eslint-config`: ESLint configuration
- `packages/typescript-config`: TypeScript configuration
- `packages/ui`: Shared UI components and hooks

## Development Setuo

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment Variables

```bash
cd apps/web
cp .env.example .env
cd ../../packages/database
cp .env.example .env
```

### 3. Setup Database

```bash
docker compose -f docker-compose.dev.yml up -d
cd packages/database
pnpm run prisma db push
```

### 2. Start the Development Server

```bash
pnpm dev
```

---

Built with ❤️ by [Trebossa](https://github.com/Trebossalol) under MIT License.
