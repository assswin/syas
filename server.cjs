const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ─── Database Mode Detection ───
// Priority: DATABASE_URL → MySQL → Supabase fallback
// 1. If DATABASE_URL exists → use PostgreSQL (Vercel production)
// 2. Otherwise → try MySQL (local dev)
// 3. If MySQL fails or goes offline → auto-fallback to Supabase via SUPABASE_URL

let usePostgres = !!process.env.DATABASE_URL;
let pool = null;        // PostgreSQL pool
let mysqlConn = null;   // MySQL connection
let dbReady = false;    // Track if any DB is connected
let mysqlAlive = false; // Track MySQL health separately
let supabaseReady = false; // Track if Supabase fallback pool is initialized
let mysqlReconnectTimer = null; // Timer for reconnection attempts

// ─── Initialize PostgreSQL (Supabase) ───
function initPostgresPool(connectionString) {
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
}

async function initPostgresTables() {
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
    client.release();
    supabaseReady = true;
    dbReady = true;
    return true;
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
    return false;
  }
}

// ─── Ensure Supabase fallback is ready ───
async function ensureSupabaseFallback() {
  if (supabaseReady && pool) return true;
  if (!process.env.SUPABASE_URL) {
    console.error('❌ No SUPABASE_URL configured for fallback.');
    return false;
  }
  console.log('🔄 Initializing Supabase fallback pool...');
  initPostgresPool(process.env.SUPABASE_URL);
  const ok = await initPostgresTables();
  if (ok) {
    console.log('✅ Supabase fallback pool ready.');
  }
  return ok;
}

// ─── Initialize MySQL ───
function initMySQL() {
  return new Promise((resolve) => {
    const mysql = require('mysql2');
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbUser = process.env.DB_USER || 'root';
    const dbPassword = process.env.DB_PASSWORD || '2005';
    const dbName = process.env.DB_NAME || 'syay_leads';

    mysqlConn = mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      connectTimeout: 5000  // 5 second timeout
    });

    // Listen for connection errors (e.g. MySQL goes offline mid-session)
    mysqlConn.on('error', (err) => {
      console.warn(`⚠️  MySQL connection error: ${err.code} — ${err.message}`);
      mysqlAlive = false;
      mysqlConn = null;

      if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'ECONNREFUSED') {
        console.log('🔄 MySQL went offline. Switching to Supabase fallback...');
        switchToSupabase();
        scheduleReconnect();
      }
    });

    mysqlConn.connect((err) => {
      if (err) {
        console.warn('⚠️  MySQL is not available:', err.message);
        mysqlConn = null;
        mysqlAlive = false;
        resolve(false);
        return;
      }
      console.log('✅ Connected to MySQL Server.');

      mysqlConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
        if (err) { resolve(false); return; }
        console.log(`Database "${dbName}" initialized.`);

        mysqlConn.changeUser({ database: dbName }, (err) => {
          if (err) { resolve(false); return; }

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
            if (err) { resolve(false); return; }
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
              if (err) { resolve(false); return; }
              console.log('MySQL "strategy_calls" table initialized successfully.');
              mysqlAlive = true;
              dbReady = true;
              resolve(true);
            });
          });
        });
      });
    });
  });
}

// ─── Switch to Supabase when MySQL goes down ───
async function switchToSupabase() {
  const ok = await ensureSupabaseFallback();
  if (ok) {
    usePostgres = true;
    dbReady = true;
    console.log('✅ Now using Supabase PostgreSQL (MySQL is offline).');
  } else {
    dbReady = false;
    console.error('❌ Both MySQL and Supabase are unavailable!');
  }
}

// ─── Periodically try to reconnect to MySQL ───
function scheduleReconnect() {
  if (mysqlReconnectTimer) return; // Already scheduled

  const RECONNECT_INTERVAL = 30000; // Try every 30 seconds
  console.log(`⏱️  Will attempt MySQL reconnection every ${RECONNECT_INTERVAL / 1000}s...`);

  mysqlReconnectTimer = setInterval(async () => {
    console.log('🔄 Attempting MySQL reconnection...');
    const ok = await initMySQL();
    if (ok) {
      console.log('✅ MySQL is back online! Switching back to MySQL.');
      usePostgres = false;
      mysqlAlive = true;
      dbReady = true;
      clearInterval(mysqlReconnectTimer);
      mysqlReconnectTimer = null;
    } else {
      console.log('⏳ MySQL still offline. Using Supabase fallback.');
    }
  }, RECONNECT_INTERVAL);
}

// ─── Safe MySQL query wrapper ───
// Tries MySQL first; if it fails, auto-switches to Supabase and retries
function mysqlQuery(sql, params) {
  return new Promise((resolve, reject) => {
    if (!mysqlConn || !mysqlAlive) {
      return reject(new Error('MySQL not connected'));
    }
    mysqlConn.query(sql, params, (err, results) => {
      if (err) {
        console.warn(`⚠️  MySQL query failed: ${err.message}`);
        // If it's a connection error, mark MySQL as dead
        if (err.fatal || err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'ECONNREFUSED' || err.code === 'ER_SERVER_SHUTDOWN') {
          mysqlAlive = false;
          mysqlConn = null;
        }
        return reject(err);
      }
      resolve(results);
    });
  });
}

// ─── Unified query helper: tries active DB, falls back if needed ───
async function queryDB(pgSQL, pgParams, mysqlSQL, mysqlParams) {
  // If currently using PostgreSQL
  if (usePostgres) {
    try {
      const result = await pool.query(pgSQL, pgParams);
      return { source: 'PostgreSQL', rows: result.rows, result };
    } catch (err) {
      console.error('❌ PostgreSQL query failed:', err.message);
      throw err;
    }
  }

  // Try MySQL first
  try {
    const results = await mysqlQuery(mysqlSQL, mysqlParams);
    return { source: 'MySQL', rows: results, result: results };
  } catch (mysqlErr) {
    console.warn('⚠️  MySQL query failed, attempting Supabase fallback...');

    // Switch to Supabase
    const fallbackOk = await ensureSupabaseFallback();
    if (!fallbackOk) {
      throw new Error('Both MySQL and Supabase are unavailable');
    }

    usePostgres = true;
    scheduleReconnect();

    // Retry with PostgreSQL
    try {
      const result = await pool.query(pgSQL, pgParams);
      console.log('✅ Query succeeded via Supabase fallback.');
      return { source: 'PostgreSQL (fallback)', rows: result.rows, result };
    } catch (pgErr) {
      console.error('❌ Supabase fallback query also failed:', pgErr.message);
      throw pgErr;
    }
  }
}


// ─── Startup: Try MySQL first, fallback to Supabase ───
async function connectDatabase() {
  if (process.env.DATABASE_URL) {
    // Production mode: use DATABASE_URL directly
    console.log('🔗 Using DATABASE_URL (production mode)...');
    usePostgres = true;
    initPostgresPool(process.env.DATABASE_URL);
    const ok = await initPostgresTables();
    if (ok) console.log('✅ PostgreSQL (Supabase) tables initialized successfully.');
    return;
  }

  // Local development: try MySQL first
  console.log('🔗 Trying local MySQL...');
  const mysqlOk = await initMySQL();

  if (mysqlOk) {
    usePostgres = false;
    console.log('✅ Using local MySQL database.');

    // Pre-initialize Supabase pool so fallback is instant
    if (process.env.SUPABASE_URL) {
      console.log('🔗 Pre-initializing Supabase fallback pool...');
      await ensureSupabaseFallback();
    }
    return;
  }

  // MySQL failed → fallback to Supabase
  if (process.env.SUPABASE_URL) {
    console.log('🔄 MySQL unavailable → Falling back to Supabase PostgreSQL...');
    usePostgres = true;
    initPostgresPool(process.env.SUPABASE_URL);
    const ok = await initPostgresTables();
    if (ok) {
      console.log('✅ Supabase fallback active! All data will be stored in Supabase.');
      scheduleReconnect(); // Keep trying MySQL
    } else {
      console.error('❌ Both MySQL and Supabase are unavailable. Server will not be able to store data.');
    }
  } else {
    console.error('❌ MySQL is offline and no SUPABASE_URL configured. No database available.');
  }
}

connectDatabase();


// ═══════════════════════════════════════════
// POST /api/leads
// ═══════════════════════════════════════════
app.post('/api/leads', async (req, res) => {
  const { name, email, phone, service, budget, message, date } = req.body;

  try {
    const { source, result, rows } = await queryDB(
      `INSERT INTO leads (name, phone, category, requirements, email, budget, date)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
      [name, phone, service, message, email, budget, date],
      `INSERT INTO leads (name, phone, category, requirements, email, budget, date) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [name, phone, service, message, email, budget, date]
    );

    const leadId = source.includes('PostgreSQL') ? rows[0].id : result.insertId;
    console.log(`New lead saved via ${source}! ID: ${leadId} | Client: ${name}`);
    res.status(200).json({ success: true, leadId, source });
  } catch (err) {
    console.error('Error inserting lead:', err.message);
    res.status(500).json({ error: 'Database insertion failed', details: err.message });
  }
});


// ═══════════════════════════════════════════
// GET /api/leads
// ═══════════════════════════════════════════
app.get('/api/leads', async (req, res) => {
  try {
    const { rows } = await queryDB(
      'SELECT * FROM leads ORDER BY id DESC',
      [],
      'SELECT * FROM leads ORDER BY id DESC',
      []
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error retrieving leads:', err.message);
    res.status(500).json({ error: 'Database retrieval failed', details: err.message });
  }
});


// ═══════════════════════════════════════════
// POST /api/bookings
// ═══════════════════════════════════════════
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, service, budget, message, date } = req.body;

  try {
    const { source, result, rows } = await queryDB(
      `INSERT INTO strategy_calls (name, phone, category, requirements, email, budget, date)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
      [name, phone, service, message, email, budget, date],
      `INSERT INTO strategy_calls (name, phone, category, requirements, email, budget, date) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [name, phone, service, message, email, budget, date]
    );

    const bookingId = source.includes('PostgreSQL') ? rows[0].id : result.insertId;
    console.log(`New booking saved via ${source}! ID: ${bookingId} | Client: ${name}`);
    res.status(200).json({ success: true, bookingId, source });
  } catch (err) {
    console.error('Error inserting booking:', err.message);
    res.status(500).json({ error: 'Database insertion failed', details: err.message });
  }
});


// ═══════════════════════════════════════════
// GET /api/bookings
// ═══════════════════════════════════════════
app.get('/api/bookings', async (req, res) => {
  try {
    const { rows } = await queryDB(
      'SELECT * FROM strategy_calls ORDER BY id DESC',
      [],
      'SELECT * FROM strategy_calls ORDER BY id DESC',
      []
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error retrieving bookings:', err.message);
    res.status(500).json({ error: 'Database retrieval failed', details: err.message });
  }
});


// ═══════════════════════════════════════════
// GET /api/sync - Sync Supabase data → local MySQL
// ═══════════════════════════════════════════
app.get('/api/sync', async (req, res) => {
  if (!process.env.SUPABASE_URL) {
    return res.status(400).json({ error: 'No SUPABASE_URL configured' });
  }

  // Connect to Supabase to pull data
  const { Pool } = require('pg');
  const supaPool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const supaClient = await supaPool.connect();

    // Fetch all data from Supabase
    const leadsResult = await supaClient.query('SELECT * FROM leads ORDER BY id ASC');
    const bookingsResult = await supaClient.query('SELECT * FROM strategy_calls ORDER BY id ASC');
    supaClient.release();
    await supaPool.end();

    // If MySQL is available, sync data into it
    if (mysqlConn && mysqlAlive) {
      const syncTable = (tableName, rows) => {
        return new Promise((resolve, reject) => {
          // Clear existing data
          mysqlConn.query(`DELETE FROM ${tableName}`, (err) => {
            if (err) return reject(err);

            if (rows.length === 0) return resolve(0);

            let inserted = 0;
            rows.forEach((row) => {
              mysqlConn.query(
                `INSERT INTO ${tableName} (name, phone, category, requirements, email, budget, date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [row.name, row.phone, row.category, row.requirements, row.email, row.budget, row.date],
                (err) => {
                  if (err) return reject(err);
                  inserted++;
                  if (inserted === rows.length) resolve(inserted);
                }
              );
            });
          });
        });
      };

      const leadsCount = await syncTable('leads', leadsResult.rows);
      const bookingsCount = await syncTable('strategy_calls', bookingsResult.rows);

      console.log(`🔄 Synced ${leadsCount} leads and ${bookingsCount} bookings from Supabase → MySQL`);
      res.status(200).json({
        success: true,
        message: `Synced from Supabase → MySQL`,
        leads: leadsCount,
        bookings: bookingsCount
      });
    } else {
      // MySQL not available, just return the Supabase data
      res.status(200).json({
        success: true,
        message: 'MySQL offline. Showing Supabase data.',
        leads: leadsResult.rows,
        bookings: bookingsResult.rows
      });
    }
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).json({ error: 'Sync failed', details: err.message });
  }
});


// ═══════════════════════════════════════════
// GET /api/status - Check database connection status
// ═══════════════════════════════════════════
app.get('/api/status', (req, res) => {
  res.json({
    database: usePostgres ? 'PostgreSQL (Supabase)' : 'MySQL (Local)',
    connected: dbReady,
    mysqlAlive,
    supabaseReady,
    mode: process.env.DATABASE_URL ? 'production' : 'development'
  });
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
