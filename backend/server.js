import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
 
const app = express();
const PORT = process.env.PORT || 5000;
 
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
 
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
 
app.use('/api/students', studentRoutes);
app.use(notFound);
app.use(errorHandler);
async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected');
    app.listen(PORT, (err) => {
      if (err) {
        console.error(`Could not start the server on port ${PORT}:`, err.message);
        process.exit(1);
      }
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Could not connect to the database:', err.message);
    process.exit(1);
  }
}
 
start();