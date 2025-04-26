const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Loading environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();


// Root route
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});