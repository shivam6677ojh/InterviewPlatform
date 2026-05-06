# AI Interview Platform

Live Website: https://interviewplatform-1.onrender.com/

AI Interview Platform is a full-stack web application that helps users practice interviews with role-based AI questions, voice interaction, instant feedback, and performance analytics.

## Features

- Role and experience-based interview generation
- Resume upload (PDF) and resume-aware question flow
- Voice-enabled interview experience (AI speaks, user answers)
- AI scoring on confidence, communication, and correctness
- Interview history with detailed report view
- Downloadable PDF interview report
- Credit-based usage model with Razorpay payment integration

## Tech Stack

Frontend:
- React + Vite
- Tailwind CSS
- Redux Toolkit
- Motion
- Recharts

Backend:
- Node.js + Express
- MongoDB + Mongoose
- JWT auth with cookies
- Multer + PDF parsing
- Razorpay integration

## Project Structure

- `client/` React frontend
- `server/` Express backend API

## Run Locally

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd Ai-Interview-Platform

cd client
npm install

cd ../server
npm install
```

### 2. Configure environment variables

Create `.env` files for both `client` and `server` with required keys (Firebase, API base URL, JWT secret, Mongo URI, Razorpay keys, and AI provider keys).

### 3. Start development servers

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## Outcome

- Automates interview practice with AI-driven question generation and evaluation
- Gives users measurable feedback and progress tracking over multiple sessions
- Simulates real interview pressure with timer-based and voice-based interaction
