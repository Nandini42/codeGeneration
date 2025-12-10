const mongoose = require('mongoose');

module.exports = async () => {
  try {
    // mongoose v6+ uses sensible defaults; no deprecated options needed
    await mongoose.connect(process.env.DB);
    console.log('Connected to database');
  } catch (err) {
    console.error('Database connection error:', err.message || err);
    process.exit(1);
  }
};