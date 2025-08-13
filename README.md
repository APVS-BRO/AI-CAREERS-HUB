# AI-CAREERS-HUB

AI-CAREERS-HUB is a modern, AI-powered career platform designed to help users explore career paths, discover relevant job opportunities, and gain AI-driven insights to shape their professional journey.  
Built with cutting-edge web technologies, it offers a fast, interactive, and responsive user experience.

---

## 🚀 Features

- **AI-Powered Career Suggestions** – Get tailored recommendations based on your skills, preferences, and market demand.
- **Real-Time Search** – Quickly find relevant opportunities with an optimized, instant-search interface.
- **Interactive UI** – Clean, responsive design with smooth animations.
- **Event Handling with Inngest** – Efficient background job processing for tasks like email notifications and data sync.
- **Error Monitoring with Sentry** – Track and debug issues in real-time.
- **Database Integration with Drizzle ORM** – Type-safe and migration-friendly database layer.
- **Scalable Deployment** – Hosted on Vercel for global availability.

## 🛠️ Tech Stack & Tools

| Category | Tools / Libraries |
|----------|-------------------|
| **Frontend Framework** | [Next.js](https://nextjs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **Background Jobs** | [Inngest](https://www.inngest.com/) |
| **Error Monitoring** | [Sentry](https://sentry.io/) |
| **Package Manager** | npm / pnpm |
| **Version Control** | Git + GitHub |
| **Deployment** | [Vercel](https://vercel.com/) |
| **PostCSS Config** | [PostCSS](https://postcss.org/) |

---

## 📂 Project Structure

AI-CAREERS-HUB/
├── app/ # Next.js App Router pages & API routes
├── components/ui/ # Reusable UI components
├── configs/ # App configuration files
├── context/ # React context providers
├── hooks/ # Custom React hooks
├── inngest/ # Inngest background job definitions
├── lib/ # Utility functions & helpers
├── public/ # Static assets (images, icons, etc.)
├── drizzle.config.ts # Drizzle ORM configuration
├── sentry.*.ts # Sentry monitoring configuration
├── middleware.tsx # App middleware logic
└── tailwind.config.ts # Tailwind CSS configuration



---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/APVS-BRO/AI-CAREERS-HUB.git
   cd AI-CAREERS-HUB
   
2. **Install dependencies
  npm install
  or
  pnpm install

3. **.env.local file
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   INNGEST_API_KEY=your_inngest_api_key

4. **Run the development server
  npm run dev
  Visit http://localhost:3000 to view the app.

5. **Build for production
  npm run build
  npm start

6. **Deployment
Optimized for Vercel:
vercel


