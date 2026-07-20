const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ─── MongoDB Connection Setup ───
let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/syay_leads';

  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    isConnected = false;
  }
}

// Ensure database connection middleware
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    await connectDB();
  }
  next();
});

// ─── Mongoose Schemas & Models ───

// Schema for Leads
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

// Schema for Strategy Call Bookings
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
// POST /api/leads
// ═══════════════════════════════════════════
app.post('/api/leads', async (req, res) => {
  const { name, email, phone, service, category, budget, message, requirements, fileAttached, date } = req.body;

  try {
    const newLead = await Lead.create({
      name,
      email,
      phone,
      category: category || service || '',
      service: service || category || '',
      requirements: requirements || message || '',
      message: message || requirements || '',
      budget,
      fileAttached: fileAttached || 'None',
      date: date || new Date().toLocaleString()
    });

    console.log(`✅ New lead saved to MongoDB! ID: ${newLead._id} | Client: ${name}`);
    res.status(200).json({ success: true, leadId: newLead._id, source: 'MongoDB' });
  } catch (err) {
    console.error('Error inserting lead into MongoDB:', err.message);
    res.status(500).json({ error: 'Database insertion failed', details: err.message });
  }
});

// ═══════════════════════════════════════════
// GET /api/leads
// ═══════════════════════════════════════════
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    console.error('Error retrieving leads from MongoDB:', err.message);
    res.status(500).json({ error: 'Database retrieval failed', details: err.message });
  }
});

// ═══════════════════════════════════════════
// POST /api/bookings
// ═══════════════════════════════════════════
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, service, category, budget, message, requirements, fileAttached, date } = req.body;

  try {
    const newBooking = await Booking.create({
      name,
      email,
      phone,
      category: category || service || '',
      service: service || category || '',
      requirements: requirements || message || '',
      message: message || requirements || '',
      budget,
      fileAttached: fileAttached || 'None',
      date: date || new Date().toLocaleString()
    });

    console.log(`✅ New booking saved to MongoDB! ID: ${newBooking._id} | Client: ${name}`);
    res.status(200).json({ success: true, bookingId: newBooking._id, source: 'MongoDB' });
  } catch (err) {
    console.error('Error inserting booking into MongoDB:', err.message);
    res.status(500).json({ error: 'Database insertion failed', details: err.message });
  }
});

// ═══════════════════════════════════════════
// GET /api/bookings
// ═══════════════════════════════════════════
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error retrieving bookings from MongoDB:', err.message);
    res.status(500).json({ error: 'Database retrieval failed', details: err.message });
  }
});

// ═══════════════════════════════════════════
// GET /api/status - Check database connection status
// ═══════════════════════════════════════════
app.get('/api/status', (req, res) => {
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const dbState = mongoose.connection ? states[mongoose.connection.readyState] || 'Unknown' : 'Disconnected';

  res.json({
    database: 'MongoDB',
    status: dbState,
    connected: mongoose.connection && mongoose.connection.readyState === 1,
    mode: process.env.NODE_ENV || 'development'
  });
});

// Initialize DB connection on startup
connectDB();

// Only start the HTTP server if not running in production serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 MongoDB API server running on http://localhost:${PORT}`);
  });
}

// Export Express app for Vercel Serverless Functions
module.exports = app;
