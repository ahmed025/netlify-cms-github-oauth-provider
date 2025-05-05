// Load environment variables FIRST
require('dotenv').config();  // Keep only this one (remove the silent version)
console.log('[DEBUG] Environment:', {
  ORIGINS: process.env.ORIGINS,
  NODE_ENV: process.env.NODE_ENV
});

// Initialize Express ONCE
const express = require('express');
const middleWarez = require('./index.js');
const port = process.env.PORT || 3000;
const app = express();

// Routes
app.get('/auth', middleWarez.auth);
app.get('/callback', middleWarez.callback);
app.get('/success', middleWarez.success);
app.get('/', middleWarez.index);

// Start server
app.listen(port, () => {
  console.log("Netlify CMS OAuth provider listening on port " + port);
});
