# Kashish Singh - Premium Developer Portfolio

Welcome to the official portfolio and developer platform of **Kashish Singh**, Founder & CEO of Navojit Technologies, currently pursuing a B.Tech in Computer Science and Engineering at Rai University. This platform serves as a dynamic CMS and showcase of engineering excellence, built with a cutting-edge modern stack and a premium 'Liquid Glass' design language.

## 🚀 Key Features

- **Premium Liquid Glass UI:** A visually stunning aesthetic featuring water-like refractions, bento-box layouts, and a custom glowing cursor.
- **Dynamic Content Management System (CMS):** A fully integrated Prisma-backed PostgreSQL database layer to manage projects, blog posts, deep dives, and timeline events seamlessly.
- **Secure Authentication Engine:** Powered by custom built [@navojit/auth](https://www.npmjs.com/package/@navojit/auth), providing robust, secure, HttpOnly cookie-based authentication for the admin dashboard.
- **Server Actions & App Router:** Leverages the latest Next.js 16 features for optimal performance, fast data mutations, and seamless navigation.
- **Fully Responsive & Accessible:** Designed to provide an enterprise-grade experience across all devices and screen sizes.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [@navojit/auth](https://www.npmjs.com/package/@navojit/auth)
- **Password Hashing:** Argon2

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL running locally or via a cloud provider (e.g., Supabase, Neon)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kashishsinghrai/kashish-portfolio.git
   cd kashish-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the necessary variables (Note: Both Pooler and Direct URLs are required for Prisma to work correctly with Supabase):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:6543/portfolio?pgbouncer=true"
   DIRECT_URL="postgresql://user:password@localhost:5432/portfolio"
   NAVOJIT_AUTH_SECRET="your-secure-secret"
   ```

4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

Open http://localhost:3000 with your browser to see the result.

## 🗄️ Project Structure
- `src/app`: Next.js App Router pages (Home, About, Projects, Blog, Notes, Admin).
- `src/app/api`: API routes including the authentication catch-all.
- `src/components`: Reusable UI components (Navbar, Footer, Hero, BentoGrid, Custom Cursor, etc.).
- `src/lib`: Core utilities, server actions, and session management functions.
- `prisma`: Database schema and migration configurations.

## 🔒 Security Note
Admin creation is handled directly via database seeding and cannot be executed via public API routes, ensuring zero backdoor vulnerabilities in the production environment.

## 📄 License
This project is licensed under the MIT License.
