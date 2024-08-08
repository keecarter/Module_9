const postModel = require('../models/postModel');

const createPost = async (req, res) => {
  const { userId, title, description, image } = req.body;
  try {
    const postId = await postModel.createPost(userId, title, description, image);
    res.status(201).json({ message: 'Post created', postId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.getPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const { userId } = req.body;
  try {
    await postModel.likePost(userId, postId);
    res.status(200).json({ message: 'Post liked' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
};

const commentOnPost = async (req, res) => {
  const { id: postId } = req.params;
  const { userId, comment } = req.body;
  try {
    await postModel.commentOnPost(userId, postId, comment);
    res.status(201).json({ message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

module.exports = {
  createPost,
  getPosts,
  likePost,
  commentOnPost
};
