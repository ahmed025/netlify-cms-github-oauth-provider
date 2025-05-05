// Add this at the VERY TOP
require('dotenv').config(); // Remove {silent: true} to see errors
console.log('[DEBUG] Environment:', {
  ORIGINS: process.env.ORIGINS,
  NODE_ENV: process.env.NODE_ENV
});

const express = require('express')
const middleWarez = require('./index.js')
const port = process.env.PORT || 3000

// Rest of your existing code...

require('dotenv').config({ silent: true })
const express = require('express')
const middleWarez = require('./index.js')
const port = process.env.PORT || 3000

const app = express()

// Initial page redirecting to Github
app.get('/auth', middleWarez.auth)

// Callback service parsing the authorization token
// and asking for the access token
app.get('/callback', middleWarez.callback)

app.get('/success', middleWarez.success)
app.get('/', middleWarez.index)

app.listen(port, () => {
  console.log("Netlify CMS OAuth provider listening on port " + port)
})
