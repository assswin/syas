const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection settings (Loads from .env file)
const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '2005';
const dbName = process.env.DB_NAME || 'syay_leads';

const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword
});

// Connect to MySQL and initialize database & table
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL Server:', err.stack);
    return;
  }
  console.log('Connected to MySQL Server.');

  // Create Database
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
    if (err) throw err;
    console.log(`Database "${dbName}" initialized.`);

    // Switch to Database
    connection.changeUser({ database: dbName }, (err) => {
      if (err) throw err;

      // Create Table
      const createTableSQL = `
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
      connection.query(createTableSQL, (err) => {
        if (err) throw err;
        console.log('MySQL "leads" table initialized successfully.');
        
        // Create Strategy Calls Table
        const createBookingsTableSQL = `
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
        connection.query(createBookingsTableSQL, (err) => {
          if (err) throw err;
          console.log('MySQL "strategy_calls" table initialized successfully.');
        });
      });
    });
  });
});


// POST endpoint: Receive client leads from website
app.post('/api/leads', (req, res) => {
  const { name, email, phone, service, budget, message, date } = req.body;

  const insertSQL = `
    INSERT INTO leads (name, phone, category, requirements, email, budget, date)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  connection.query(insertSQL, [name, phone, service, message, email, budget, date], (err, results) => {
    if (err) {
      console.error('Error inserting lead into MySQL:', err);
      return res.status(500).json({ error: 'Database insertion failed' });
    }
    console.log(`New lead saved! ID: ${results.insertId} | Client: ${name}`);
    res.status(200).json({ success: true, leadId: results.insertId });
  });
});

// GET endpoint: Review collected client data
app.get('/api/leads', (req, res) => {
  connection.query('SELECT * FROM leads ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Error retrieving leads:', err);
      return res.status(500).json({ error: 'Database retrieval failed' });
    }
    res.status(200).json(results);
  });
});

// POST endpoint: Receive strategy call bookings from website
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, service, budget, message, date } = req.body;

  const insertSQL = `
    INSERT INTO strategy_calls (name, phone, category, requirements, email, budget, date)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  connection.query(insertSQL, [name, phone, service, message, email, budget, date], (err, results) => {
    if (err) {
      console.error('Error inserting booking into MySQL:', err);
      return res.status(500).json({ error: 'Database insertion failed' });
    }
    console.log(`New booking saved! ID: ${results.insertId} | Client: ${name}`);
    res.status(200).json({ success: true, bookingId: results.insertId });
  });
});

// GET endpoint: Review collected booking data
app.get('/api/bookings', (req, res) => {
  connection.query('SELECT * FROM strategy_calls ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Error retrieving bookings:', err);
      return res.status(500).json({ error: 'Database retrieval failed' });
    }
    res.status(200).json(results);
  });
});

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve index.html for React Router / SPA navigation
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Lead database API server running on http://localhost:${PORT}`);
});
