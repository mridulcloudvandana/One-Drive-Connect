const express = require('express');
const helmet = require('helmet');
const crypto = require('crypto');

const app = express();


app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64'); // Generate nonce
    next();
  });

// Use helmet to set the HSTS header
app.use(
  helmet({
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
  })
);

// Example route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
