const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ─── Security Hardening ───
app.disable('x-powered-by');

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https:; connect-src 'self' http: https:;");
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()) 
  : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true,
  maxAge: 86400
}));

app.use(express.json({ limit: '100kb' })); // Limit body payload size

// Sliding-window IP Rate Limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS_PER_WINDOW = 30;

function rateLimiter(req, res, next) {
  const rawIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const record = rateLimitMap.get(rawIp) || { count: 0, startTime: now };

  if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.startTime = now;
  } else {
    record.count += 1;
  }

  rateLimitMap.set(rawIp, record);

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  next();
}

// Input Sanitization helper
function sanitizeString(val, maxLen = 1000) {
  if (typeof val !== 'string') return '';
  let clean = val.trim();
  // Strip script tags and HTML tags
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<[^>]*>/g, '');
  return clean.substring(0, maxLen);
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Admin Authorization Middleware for GET data endpoints
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['x-api-key'];
  const adminSecret = process.env.ADMIN_API_KEY || 'syas-admin-secure-key-2026';

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Access token missing' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token !== adminSecret) {
    return res.status(403).json({ error: 'Forbidden: Invalid authorization key' });
  }

  next();
}

// ─── MongoDB Connection Setup ───
let cachedPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedPromise) {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/syay_leads';
    console.log('🔄 Connecting to Database...');
    cachedPromise = mongoose.connect(mongoURI).then((m) => {
      console.log('✅ Connected to Database successfully.');
      return m;
    }).catch((err) => {
      cachedPromise = null;
      console.error('❌ Database Connection Error');
      throw err;
    });
  }

  return await cachedPromise;
}

// Ensure database connection middleware
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectDB();
    } catch (err) {
      return res.status(500).json({ error: 'Database connection error' });
    }
  }
  next();
});

// ─── Mongoose Schemas & Models ───
const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  category: { type: String, default: '' },
  service: { type: String, default: '' },
  requirements: { type: String, default: '' },
  message: { type: String, default: '' },
  budget: { type: String, default: '' },
  fileAttached: { type: String, default: 'None' },
  date: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  category: { type: String, default: '' },
  service: { type: String, default: '' },
  requirements: { type: String, default: '' },
  message: { type: String, default: '' },
  budget: { type: String, default: '' },
  fileAttached: { type: String, default: 'None' },
  date: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

// ═══════════════════════════════════════════
// POST /api/leads - Create Lead Inquiry
// ═══════════════════════════════════════════
app.post('/api/leads', rateLimiter, async (req, res) => {
  const name = sanitizeString(req.body.name, 100);
  const email = sanitizeString(req.body.email, 150);
  const phone = sanitizeString(req.body.phone, 30);
  const service = sanitizeString(req.body.service || req.body.category, 100);
  const category = sanitizeString(req.body.category || req.body.service, 100);
  const budget = sanitizeString(req.body.budget, 50);
  const message = sanitizeString(req.body.message || req.body.requirements, 2000);
  const requirements = sanitizeString(req.body.requirements || req.body.message, 2000);
  const fileAttached = sanitizeString(req.body.fileAttached, 200);
  const date = sanitizeString(req.body.date, 50);

  if (!name || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Valid name and email address are required.' });
  }

  try {
    await Lead.create({
      name,
      email,
      phone,
      category,
      service,
      requirements,
      message,
      budget,
      fileAttached: fileAttached || 'None',
      date: date || new Date().toLocaleString()
    });

    res.status(200).json({ success: true, message: 'Inquiry submitted successfully.' });
  } catch (err) {
    console.error('Error inserting lead inquiry');
    res.status(500).json({ error: 'Failed to process inquiry request.' });
  }
});

// ═══════════════════════════════════════════
// GET /api/leads - Secured Admin Endpoint
// ═══════════════════════════════════════════
app.get('/api/leads', requireAdminAuth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).select('-__v');
    res.status(200).json(leads);
  } catch (err) {
    console.error('Error retrieving leads');
    res.status(500).json({ error: 'Data retrieval failed.' });
  }
});

// ═══════════════════════════════════════════
// POST /api/bookings - Create Meeting Booking
// ═══════════════════════════════════════════
app.post('/api/bookings', rateLimiter, async (req, res) => {
  const name = sanitizeString(req.body.name, 100);
  const email = sanitizeString(req.body.email, 150);
  const phone = sanitizeString(req.body.phone, 30);
  const service = sanitizeString(req.body.service || req.body.category, 100);
  const category = sanitizeString(req.body.category || req.body.service, 100);
  const budget = sanitizeString(req.body.budget, 50);
  const message = sanitizeString(req.body.message || req.body.requirements, 2000);
  const requirements = sanitizeString(req.body.requirements || req.body.message, 2000);
  const fileAttached = sanitizeString(req.body.fileAttached, 200);
  const date = sanitizeString(req.body.date, 50);

  if (!name || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Valid name and email address are required.' });
  }

  try {
    await Booking.create({
      name,
      email,
      phone,
      category,
      service,
      requirements,
      message,
      budget,
      fileAttached: fileAttached || 'None',
      date: date || new Date().toLocaleString()
    });

    res.status(200).json({ success: true, message: 'Booking submitted successfully.' });
  } catch (err) {
    console.error('Error inserting booking');
    res.status(500).json({ error: 'Failed to process booking request.' });
  }
});

// ═══════════════════════════════════════════
// GET /api/bookings - Secured Admin Endpoint
// ═══════════════════════════════════════════
app.get('/api/bookings', requireAdminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).select('-__v');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error retrieving bookings');
    res.status(500).json({ error: 'Data retrieval failed.' });
  }
});

// ═══════════════════════════════════════════
// GET /api/status - Sanitized status endpoint
// ═══════════════════════════════════════════
app.get('/api/status', async (req, res) => {
  await connectDB();
  const isConnected = mongoose.connection && mongoose.connection.readyState === 1;

  res.json({
    status: isConnected ? 'Online' : 'Offline',
    connected: isConnected
  });
});

// Initialize DB connection on startup
connectDB().catch(() => {});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
  });
}

module.exports = app;
