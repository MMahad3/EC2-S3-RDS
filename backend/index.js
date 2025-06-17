const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
require('dotenv').config();

const sequelize = require('./db'); // Sequelize connection
const Todo = require('./models/todo'); // Sequelize model

const app = express();
const port = process.env.PORT || 5000;

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

// Routes
app.use('/api', routes);

// Error handler
app.use((err, req, res, next) => {
  console.error("API error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Connect to MySQL and start server
sequelize.sync()
  .then(() => {
    console.log('MySQL database synced successfully.');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
