const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool (Loads from .env file or Vercel env variables)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

// Initialize database tables
const initDB = async () => {
  try {
    const client = await pool.connect();
    
    // Create Leads Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        category VARCHAR(150),
        requirements TEXT,
        email VARCHAR(255),
        budget VARCHAR(100),
        date VARCHAR(100)
      );
    `);
    
    // Create Strategy Calls Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS strategy_calls (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        category VARCHAR(150),
        requirements TEXT,
        email VARCHAR(255),
        budget VARCHAR(100),
        date VARCHAR(100)
      );
    `);
    
    console.log('PostgreSQL tables initialized successfully.');
    client.release();
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
  }
};

initDB();

// POST endpoint: Receive client leads from website
app.post('/api/leads', async (req, res) => {
  const { name, email, phone, service, budget, message, date } = req.body;

  const insertSQL = `
    INSERT INTO leads (name, phone, category, requirements, email, budget, date)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
  `;

  try {
    const result = await pool.query(insertSQL, [name, phone, service, message, email, budget, date]);
    console.log(`New lead saved! ID: ${result.rows[0].id} | Client: ${name}`);
    res.status(200).json({ success: true, leadId: result.rows[0].id });
  } catch (err) {
    console.error('Error inserting lead into PostgreSQL:', err);
    res.status(500).json({ error: 'Database insertion failed' });
  }
});

// GET endpoint: Review collected client data
app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving leads:', err);
    res.status(500).json({ error: 'Database retrieval failed' });
  }
});

// POST endpoint: Receive strategy call bookings from website
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, service, budget, message, date } = req.body;

  const insertSQL = `
    INSERT INTO strategy_calls (name, phone, category, requirements, email, budget, date)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
  `;

  try {
    const result = await pool.query(insertSQL, [name, phone, service, message, email, budget, date]);
    console.log(`New booking saved! ID: ${result.rows[0].id} | Client: ${name}`);
    res.status(200).json({ success: true, bookingId: result.rows[0].id });
  } catch (err) {
    console.error('Error inserting booking into PostgreSQL:', err);
    res.status(500).json({ error: 'Database insertion failed' });
  }
});

// GET endpoint: Review collected booking data
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM strategy_calls ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving bookings:', err);
    res.status(500).json({ error: 'Database retrieval failed' });
  }
});

// Only start the server if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Lead database API server running on http://localhost:${PORT}`);
  });
}

// Export the Express API for Vercel Serverless Functions
module.exports = app;
