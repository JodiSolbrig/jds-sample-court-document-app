require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const serverless = require('serverless-http');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

// Enable CORS first
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Add root route
app.get('/', (req, res) => {
  res.json({ message: 'Court Document API', endpoints: ['GET /documents', 'POST /documents'] });
});

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create documents table
pool.query(`
  CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    case_number VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// POST /documents - Upload document
app.post('/documents', upload.single('file'), async (req, res) => {
  try {
    const { case_number, title } = req.body;
    const file_path = req.file.path;
    const result = await pool.query(
      'INSERT INTO documents (case_number, title, file_path) VALUES ($1, $2, $3) RETURNING *',
      [case_number, title, file_path]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/documents', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM documents ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export for serverless (AWS)
module.exports.handler = serverless(app);

// Start server for local testing
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}