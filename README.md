# Resume Tailor

An AI-powered web app to generate and tailor resumes for specific jobs.

## Features
- Magic link (email) authentication (Supabase)
- Resume upload/input and storage (MongoDB)
- AI-powered resume tailoring (n8n logic)
- User dashboard to manage resumes
- Export tailored resumes (PDF/Word)

## Getting Started

1. Clone the repo and install dependencies:
   ```sh
   npm install
   ```
2. Set up your `.env.local` (see `.env.example` for required variables)
3. Run the development server:
   ```sh
   npm run dev
   ```

## Deployment
- Ready for Vercel deployment.

## Folders
- `src/app/` — Main app pages and routing
- `src/pages/api/` — API routes (for resume, AI logic, etc.)

---

See `/docs/PRD.md` for full product requirements and wireframes.
