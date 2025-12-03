# Minimal Portfolio Website

A professional, data-driven strategist portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Prisma (SQLite).

## Features

- **Minimalist Design**: Clean, typography-focused aesthetic (Linear/Vercel style).
- **Admin Dashboard**: Secure `/admin` area to manage projects, about content, and hero text.
- **Dynamic Content**: All content is stored in a SQLite database (easily swappable to Postgres/Supabase).
- **Responsive**: Fully responsive design for all devices.
- **SEO Optimized**: Built with Next.js App Router and semantic HTML.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite (Prisma ORM)
- **Auth**: Custom Session/JWT (Jose)
- **Icons**: Lucide React

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   ```bash
   # Create database tables
   npx prisma migrate dev --name init

   # Seed database (Optional, if script works in your env)
   # npx tsx prisma/seed.ts
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

4. **Access Admin Panel**
   - Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Default Credentials (if seeded): `admin@example.com` / `admin123`
   - If not seeded, check `app/api/auth/login/route.ts` for hardcoded fallback or create a user manually.

## Deployment (Vercel)

1. **Database**: For Vercel, you cannot use SQLite (file-based). You must switch to a provider like **Supabase** or **Vercel Postgres**.
   - Update `prisma/schema.prisma`:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - Update `.env` with your Postgres connection string.
   - Run `npx prisma migrate deploy` to push schema to production DB.

2. **Environment Variables**:
   - `DATABASE_URL`: Your database connection string.
   - `NEXT_PUBLIC_...`: Any public env vars.

3. **Deploy**:
   - Push to GitHub.
   - Import project in Vercel.
   - Vercel will automatically detect Next.js and build.

## Project Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Utilities, Prisma client, Auth helpers.
- `prisma`: Database schema and migrations.
