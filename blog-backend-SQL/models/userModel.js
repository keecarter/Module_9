const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig'); // Assuming you separate dbConfig for reuse

const createUser = async (username, password) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [result] = await connection.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );
    return result.insertId;
  } finally {
    connection.end();
  }
};

module.exports = {
  createUser
};
