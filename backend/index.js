const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const routes = require('./routes/api');
require('dotenv').config();

const sequelize = require('./db'); 
const Todo = require('./models/todo'); 

const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.get('/health', (req, res) => {
  res.json({ status: 'Backend server is running', port });
});

app.use(bodyParser.json());


app.use('/api', routes);


app.use((err, req, res, next) => {
  console.error("API error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

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
