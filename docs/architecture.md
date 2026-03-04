# Architecture Notes

## Frontend
- React + Vite SPA
- TailwindCSS utility-first styling
- Axios API client with a single base URL
- Single-page generation flow with optional resume upload

## Backend
- Express API with route modules
- OpenAI service abstraction to keep prompt logic centralized
- Mongoose model for generation history
- Multer middleware for resume uploads

## Data Flow
1. User fills form and submits profile + job description.
2. Frontend sends payload to backend.
3. Backend calls OpenAI service for resume and/or cover letter.
4. Backend stores request/response metadata to MongoDB.
5. Frontend renders result and allows print-to-PDF.
