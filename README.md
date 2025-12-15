# 🚀 Next Monorepo Template [WORK IN PROGRESS]

## ✨ Built-In Features

- 🔐 Authentication (Sign in and sign up)
- 👤 Account Profile & Security Settings

## 🛠️ Tech Stack

- ⚡ Turborepo
- ⚛️ Next.js 16 & React 19
- 🎨 Shadcn/UI & Tailwind CSS
- ✅ Next Safe Action
- 📝 React Hook Form
- 🔒 Better Auth

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
