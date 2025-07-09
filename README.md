Court Document Filing Dashboard
A full-stack web application for submitting and managing court document attachments, built to demonstrate skills for One Legal’s Front-End Developer role. Features a React/TypeScript front-end and a Node.js/Express API with PostgreSQL, deployable on AWS.
Project Overview

Front-End: React, TypeScript, HTML5, CSS3 for a responsive, intuitive dashboard.
Back-End: Node.js, Express, PostgreSQL for document storage and retrieval via REST API.
Purpose: Showcase proficiency in React, TypeScript, Git, CI/CD, and PostgreSQL, aligned with One Legal’s tech stack and client-focused mission.

Setup Instructions

Clone the repository: git clone <repo-url>.
Front-End:
Navigate to client/: cd client.
Install dependencies: npm install.
Run locally: npm run dev (defaults to http://localhost:5173).

Back-End:
Navigate to api/: cd api.
Install dependencies: npm install.
Create .env with DATABASE_URL (PostgreSQL connection string) and PORT (e.g., 3000).
Create uploads/ directory: mkdir uploads.
Run locally: npm run dev.

Ensure PostgreSQL is running (e.g., via AWS RDS or local instance).

API Endpoints

POST /api/documents: Upload a document.
Form-data: case_number (string), title (string), file (PDF).
Response: { id, case_number, title, file_path, created_at }.

GET /api/documents: List all documents.
Response: [{ id, case_number, title, file_path, created_at }, ...].

Deployment

AWS: Deploy front-end to S3/CloudFront, API to ECS Fargate, and PostgreSQL to RDS.
File Storage: Local uploads/ for demo; AWS S3 recommended for production.
CI/CD: GitHub Actions for automated builds and deployments (see .github/workflows/deploy.yml).

Notes

Built with One Legal’s requirements in mind: clean code, Git, Agile practices, and client-centric design.
Production enhancements (not implemented): AWS S3 for file storage, JWT authentication, input validation.
Live demo: [Link to deployed app, if available].

Tech Stack

Front-End: React, TypeScript, HTML5, CSS3
Back-End: Node.js, Express, PostgreSQL
Tools: Git, GitHub, AWS (ECS, RDS, S3), Vite
