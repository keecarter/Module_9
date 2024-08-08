const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

const initializeDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('Database connected successfully!');
    // Your other database initialization logic here
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
