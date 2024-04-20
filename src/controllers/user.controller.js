import * as useService from '../services/user.services.js';
export const createPost = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { title, content } = req.body;
    const result = await useService.createPost(title, content, userEmail);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { postId } = req.params;

    const { title, content } = req.body;
    const result = await useService.updatePost(
      userEmail,
      postId,
      title,
      content
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const users = await useService.getAllPosts();
    res.json({ message: 'Get all posts', data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getOnePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const users = await useService.getOnePost(postId);
    res.json({ message: 'Get single posts', data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  const userEmail = req.user.email;
  const { postId } = req.params;
  try {
    const users = await useService.deletePost(userEmail, postId);
    res.json({ message: 'delete post ', data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
