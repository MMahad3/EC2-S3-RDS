const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Connect to the Database
mongoose.connect(process.env.DB, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(() => console.log(`Database connected successfully`))
.catch(err => console.log(err));

// Use Node.js native promises
mongoose.Promise = global.Promise;

// CORS middleware with support for PUT, DELETE, OPTIONS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods", 
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Allow preflight requests
  }
  next();
});

app.use(bodyParser.json());

app.use('/api', routes);

// Improved error handler to send response
app.use((err, req, res, next) => {
  console.error("API error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
