const userModel = require('../models/userModel');

const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userId = await userModel.createUser(username, password);
    res.status(201).json({ message: 'User created', userId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  createUser
};
