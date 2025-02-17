
A modern authentication template built with Next.js, featuring OAuth integration and dark mode support.

## Features

- OAuth authentication (Google & GitHub)
- Responsive design
- Dark/Light mode
- TypeScript support
- Database user persistence

## Tech Stack

- Next.js 15
- Auth.js
- Prisma
- Tailwind CSS
- PostgreSQL
- Shadcn UI

## Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/cipherlink.git
   cd cipherlink
   npm install
   ```

2. **Set Environment Variables**
   ```env
   DATABASE_URL= 
   NEXTAUTH_SECRET=
   
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   ```

3. **Setup Database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

