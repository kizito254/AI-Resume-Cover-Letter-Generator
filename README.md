# AI Resume & Cover Letter Generator

A full-stack web application that generates ATS-friendly resumes and personalized cover letters based on a user's profile and target job description.

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS + Axios
- **Backend**: Node.js + Express
- **AI**: OpenAI API
- **Database**: MongoDB (Mongoose)
- **Auth (optional)**: JWT hooks prepared
- **Payments (optional)**: Stripe-ready architecture notes in docs

## Project Structure

```
ai-resume-generator/
├── client/        # React frontend
├── server/        # Node backend
├── docs/          # Architecture notes and API docs
├── README.md
└── .gitignore
```

## Quick Start

### 1) Install dependencies

```bash
npm install
npm run install:all
```

### 2) Configure environment

Create `server/.env`:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ai_resume_generator
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4o-mini
JWT_SECRET=change_me
CLIENT_URL=http://localhost:5173
```

Create `client/.env`:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3) Run development servers

```bash
npm run dev
```

This starts:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:5000`

## MVP Features Included

1. **Resume Generator**
   - Inputs: name, skills, experience, education, target job title, job description
   - Output: ATS-friendly resume

2. **Cover Letter Generator**
   - Inputs: company name, position, job description
   - Output: personalized 3–4 paragraph cover letter

3. **PDF Download**
   - Frontend print-to-PDF flow (`window.print`) via dedicated printable layout

4. **Upload Existing Resume (Optional)**
   - File upload endpoint scaffolded with Multer

## API Endpoints

- `POST /api/generate/resume`
- `POST /api/generate/cover-letter`
- `POST /api/upload/resume`
- `GET /api/history/:userId`
- `GET /api/health`

## Notes

- Generation runs through `server/src/services/openaiService.js`.
- If OpenAI key is missing, API returns safe fallback templates so local development still works.
- User history is persisted in MongoDB using the `Generation` model.

## Future Enhancements

- JWT authentication middleware enablement
- Stripe premium generation limits
- Rich resume templates and export themes
