const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ─── Database Mode Detection ───
// If DATABASE_URL exists → use PostgreSQL (Supabase / Vercel production)
// Otherwise → use MySQL (local development)
const usePostgres = !!process.env.DATABASE_URL;
let pool;       // PostgreSQL pool
let mysqlConn;  // MySQL connection

if (usePostgres) {
  // ─── PostgreSQL (Supabase) ───
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
  });

  const initPostgres = async () => {
    try {
      const client = await pool.connect();
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
      console.log('✅ PostgreSQL (Supabase) tables initialized successfully.');
      client.release();
    } catch (err) {
      console.error('Error connecting to PostgreSQL:', err);
    }
  };
  initPostgres();

} else {
  // ─── MySQL (Local) ───
  const mysql = require('mysql2');
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbUser = process.env.DB_USER || 'root';
  const dbPassword = process.env.DB_PASSWORD || '2005';
  const dbName = process.env.DB_NAME || 'syay_leads';

  mysqlConn = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword
  });

  mysqlConn.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL Server:', err.stack);
      return;
    }
    console.log('✅ Connected to MySQL Server.');

    mysqlConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
      if (err) throw err;
      console.log(`Database "${dbName}" initialized.`);

      mysqlConn.changeUser({ database: dbName }, (err) => {
        if (err) throw err;

        const createLeadsSQL = `
          CREATE TABLE IF NOT EXISTS leads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(100),
            category VARCHAR(150),
            requirements TEXT,
            email VARCHAR(255),
            budget VARCHAR(100),
            date VARCHAR(100)
          );
        `;
        mysqlConn.query(createLeadsSQL, (err) => {
          if (err) throw err;
          console.log('MySQL "leads" table initialized successfully.');

          const createBookingsSQL = `
            CREATE TABLE IF NOT EXISTS strategy_calls (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              phone VARCHAR(100),
              category VARCHAR(150),
              requirements TEXT,
              email VARCHAR(255),
              budget VARCHAR(100),
              date VARCHAR(100)
            );
          `;
          mysqlConn.query(createBookingsSQL, (err) => {
            if (err) throw err;
            console.log('MySQL "strategy_calls" table initialized successfully.');
          });
        });
      });
    });
  });
}


// ═══════════════════════════════════════════
// POST /api/leads
// ═══════════════════════════════════════════
app.post('/api/leads', async (req, res) => {
  const { name, email, phone, service, budget, message, date } = req.body;

  if (usePostgres) {
    try {
      const result = await pool.query(
        `INSERT INTO leads (name, phone, category, requirements, email, budget, date)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
        [name, phone, service, message, email, budget, date]
      );
      console.log(`New lead saved! ID: ${result.rows[0].id} | Client: ${name}`);
      res.status(200).json({ success: true, leadId: result.rows[0].id });
    } catch (err) {
      console.error('Error inserting lead into PostgreSQL:', err);
      res.status(500).json({ error: 'Database insertion failed' });
    }
  } else {
    mysqlConn.query(
      `INSERT INTO leads (name, phone, category, requirements, email, budget, date) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [name, phone, service, message, email, budget, date],
      (err, results) => {
        if (err) {
          console.error('Error inserting lead into MySQL:', err);
          return res.status(500).json({ error: 'Database insertion failed' });
        }
        console.log(`New lead saved! ID: ${results.insertId} | Client: ${name}`);
        res.status(200).json({ success: true, leadId: results.insertId });
      }
    );
  }
});


// ═══════════════════════════════════════════
// GET /api/leads
// ═══════════════════════════════════════════
app.get('/api/leads', async (req, res) => {
  if (usePostgres) {
    try {
      const result = await pool.query('SELECT * FROM leads ORDER BY id DESC');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error retrieving leads:', err);
      res.status(500).json({ error: 'Database retrieval failed' });
    }
  } else {
    mysqlConn.query('SELECT * FROM leads ORDER BY id DESC', (err, results) => {
      if (err) {
        console.error('Error retrieving leads:', err);
        return res.status(500).json({ error: 'Database retrieval failed' });
      }
      res.status(200).json(results);
    });
  }
});


// ═══════════════════════════════════════════
// POST /api/bookings
// ═══════════════════════════════════════════
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, service, budget, message, date } = req.body;

  if (usePostgres) {
    try {
      const result = await pool.query(
        `INSERT INTO strategy_calls (name, phone, category, requirements, email, budget, date)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
        [name, phone, service, message, email, budget, date]
      );
      console.log(`New booking saved! ID: ${result.rows[0].id} | Client: ${name}`);
      res.status(200).json({ success: true, bookingId: result.rows[0].id });
    } catch (err) {
      console.error('Error inserting booking into PostgreSQL:', err);
      res.status(500).json({ error: 'Database insertion failed' });
    }
  } else {
    mysqlConn.query(
      `INSERT INTO strategy_calls (name, phone, category, requirements, email, budget, date) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [name, phone, service, message, email, budget, date],
      (err, results) => {
        if (err) {
          console.error('Error inserting booking into MySQL:', err);
          return res.status(500).json({ error: 'Database insertion failed' });
        }
        console.log(`New booking saved! ID: ${results.insertId} | Client: ${name}`);
        res.status(200).json({ success: true, bookingId: results.insertId });
      }
    );
  }
});


// ═══════════════════════════════════════════
// GET /api/bookings
// ═══════════════════════════════════════════
app.get('/api/bookings', async (req, res) => {
  if (usePostgres) {
    try {
      const result = await pool.query('SELECT * FROM strategy_calls ORDER BY id DESC');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error retrieving bookings:', err);
      res.status(500).json({ error: 'Database retrieval failed' });
    }
  } else {
    mysqlConn.query('SELECT * FROM strategy_calls ORDER BY id DESC', (err, results) => {
      if (err) {
        console.error('Error retrieving bookings:', err);
        return res.status(500).json({ error: 'Database retrieval failed' });
      }
      res.status(200).json(results);
    });
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
