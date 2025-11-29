# 🗂️ S3 File Browser — Monorepo

A modern, full-stack **S3 File Browser** built using a **Turborepo** architecture.

Browse, upload, move, and manage files stored in **AWS S3**, with a seamless web UI powered by **TanStack Start**, and a backend powered by **NestJS** + **Prisma (MySQL)**.

---

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend (Web)** | [TanStack Start](https://tanstack.com/start) + [Tailwind CSS](https://tailwindcss.com) |
| **Backend (API)** | [NestJS](https://nestjs.com) + [Prisma ORM](https://www.prisma.io) |
| **Database** | MySQL |
| **Storage** | AWS S3 |
| **Monorepo Tools** | [Turborepo](https://turbo.build/repo) + [pnpm](https://pnpm.io) |
| **Language** | TypeScript |

---

## 📁 Project Structure

```
s3-file-browser/
│
├── apps/
│   ├── api/          # NestJS backend (Prisma + MySQL)
│   └── web/          # TanStack Start frontend (React + Tailwind)
│
├── packages/
│   └── db/           # Prisma schema, generated client & DB utilities
│
├── .env              # Root environment file (dotenvx-compatible)
├── turbo.json        # Turborepo pipeline config
├── pnpm-workspace.yaml
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

- [Node.js](https://nodejs.org) v20+
- [pnpm](https://pnpm.io) v9+
- [MySQL](https://www.mysql.com/)
- [AWS Account](https://aws.amazon.com/) (for S3)

---

### 2️⃣ Install Dependencies

```bash
pnpm install
```

---

### 3️⃣ Configure Environment

Create a `.env` file at the root of your repo:

```bash
cp .env.example .env
```

Then add your environment variables:

```env
DATABASE_URL="mysql://user:password@localhost:3306/s3_file_browser"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="your-region"
S3_BUCKET_NAME="your-bucket"
```

---

### 4️⃣ Database Setup

Run Prisma commands from the monorepo root:

```bash
pnpm turbo db:generate
pnpm turbo db:migrate
```

---

### 5️⃣ Run Development Servers

#### Start both apps in parallel:
```bash
pnpm dev
```

or individually:

```bash
# Backend (NestJS)
pnpm --filter api dev

# Frontend (TanStack Start)
pnpm --filter web dev
```

---

### 6️⃣ Build for Production

```bash
pnpm build
```

---

### 7️⃣ Deploy

You can deploy:
- **Frontend** → Vercel / Netlify  
- **Backend** → AWS EC2 / Lambda / Docker  
- **Database** → AWS RDS or PlanetScale  
- **Storage** → AWS S3

---

## 🧩 Shared Packages

| Package | Description |
|----------|-------------|
| `@repo/db` | Prisma client & database access layer |
| `@repo/typescript-config` | Shared TypeScript configuration |

---

## 🧰 Common Commands

| Command | Description |
|----------|-------------|
| `pnpm dev` | Run all dev servers concurrently |
| `pnpm build` | Build all packages & apps |
| `pnpm lint` | Run ESLint across all workspaces |
| `pnpm turbo db:generate` | Generate Prisma client |
| `pnpm turbo db:migrate` | Run DB migrations |

---

## 🧑‍💻 Development Notes

- Prisma client is generated inside `packages/db/generated/`
- Import `prisma` anywhere via:
  ```ts
  import { prisma } from '@repo/db';
  ```

---

## 🛠️ Future Enhancements

- 🔐 JWT-based Auth (NestJS + TanStack Router)
- 📸 Thumbnail generation for media files
- 🧩 File versioning support
- ⚙️ Admin dashboard
- ☁️ Optional object tagging & Rekognition support

---

## 🧑‍💼 Author

**Lakshmikanta Patra ([@frontendfixer](https://github.com/frontendfixer))**  
JavaScript Full Stack Developer — Node.js | React | AWS

---

## 📜 License

MIT © 2025 Lakshmikanta Patra
