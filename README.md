# Resume Tailor

Resume Tailor is an AI-powered web app that helps users generate and tailor resumes for specific jobs using AI. Users can log in, upload or input their resume, and receive a tailored version based on job descriptions. The app features a beautiful cosmic/star theme, live preview, and direct export to PDF or Word.

---

## Features
- **Magic link (email) authentication** (Supabase)
- **Resume upload/input and storage** (MongoDB)
- **AI-powered resume tailoring** (n8n logic, OpenAI integration)
- **User dashboard** to manage resumes
- **Template selection** (Modern, Minimalist, Creative)
- **Live preview** with cosmic/star background
- **Export tailored resumes** (PDF/Word)
- **Modern, responsive UI** (Next.js, Tailwind CSS)

---

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS, Framer Motion
- **Backend:** Supabase (auth), MongoDB (data)
- **AI:** n8n workflow (OpenAI integration)
- **PDF Generation:** @react-pdf/renderer
- **Word Export:** docx, file-saver
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
https://github.com/your-username/resume-tailor.git
cd resume-tailor

# Install dependencies
npm install
# or
yarn install
```

### Environment Setup
- Copy `.env.example` to `.env.local` and fill in required variables (Supabase, MongoDB, etc.)

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage
1. **Sign up or log in** with your email (magic link).
2. **Upload or paste your resume.**
3. **Paste the job description** or target role.
4. **Let AI tailor your resume** to the job requirements.
5. **Select a template** (Modern, Minimalist, Creative).
6. **Preview your resume** in the live editor.
7. **Download as PDF or Word** with one click.
8. **Manage your resumes** from the dashboard.

---

## Folder Structure
- `src/app/` — Main app pages and routing
  - `job/` — Job description input
  - `resume/` — Resume upload/input
  - `select-template/` — Template selection
  - `preview/` — Resume preview and export
  - `dashboard/` — User dashboard
  - `editor/`, `builder/`, `tailor/`, `upload/`, `signup/`, `login/`, etc.
- `src/components/` — Reusable UI and template components
  - `templates/` — Resume templates (Modern, Minimalist, Creative)
  - `CosmicParticlesWrapper.tsx` — Falling stars/cosmic background
- `src/lib/` — Utility libraries
- `src/types/` — TypeScript types
- `src/scripts/` — Scripts
- `src/styles/` — Global and component styles
- `public/` — Static assets

---

## Templates
- **ModernTemplate.tsx** — Blue accents, bold section titles, modern layout
- **MinimalistTemplate.tsx** — Simple gray dividers, clean whitespace
- **CreativeTemplate.tsx** — Purple left border accents, playful section titles

---

## Deployment
- Ready for [Vercel](https://vercel.com/) deployment.
- Configure environment variables in Vercel dashboard.

---

## Product Requirements & Wireframes
See [`/docs/PRD.md`](docs/PRD.md) for full product requirements and wireframes.

---

## Credits
- Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [@react-pdf/renderer](https://react-pdf.org/), [docx](https://www.npmjs.com/package/docx), [tsparticles](https://particles.js.org/).
- AI logic via [n8n](https://n8n.io/) and [OpenAI](https://openai.com/).

## License
MIT 
