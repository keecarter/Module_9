const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');

const createPost = async (userId, title, description, image) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [result] = await connection.execute(
      'INSERT INTO posts (user_id, title, description, image) VALUES (?, ?, ?, ?)',
      [userId, title, description, image]
    );
    return result.insertId;
  } finally {
    connection.end();
  }
};

const getPosts = async () => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [posts] = await connection.execute(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    return posts;
  } finally {
    connection.end();
  }
};

const likePost = async (userId, postId) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
      [userId, postId]
    );
  } finally {
    connection.end();
  }
};

const commentOnPost = async (userId, postId, comment) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      'INSERT INTO comments (user_id, post_id, comment) VALUES (?, ?, ?)',
      [userId, postId, comment]
    );
  } finally {
    connection.end();
  }
};

module.exports = {
  createPost,
  getPosts,
  likePost,
  commentOnPost
};
