import { ErrorWithStatus } from '../Exception/error-with-status.exception.js';
import User from '../model/schema/user.schema.js';

export const createPost = async (title, content, userEmail) => {
  try {
    // Find the user by their ID
    const user = await User.findOne({ email: userEmail }).select(
      '-password -confirmPassword'
    );

    if (!user) {
      throw new ErrorWithStatus('User not found', 404);
    }

    // Create a new post object
    const newPost = {
      title,
      content,
      creator: user._id,
    };

    user.posts.push(newPost);
    await user.save();
    return {
      message: 'post created successfully',
      data: user,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};

export const updatePost = async (userEmail, postId, title, content) => {
  try {
    const user = await User.findOne({ email: userEmail }).select(
      '-password -confirmPassword'
    );

    if (!user) {
      throw new ErrorWithStatus('User not found', 404);
    }

    // Update the post using findByIdAndUpdate
    const updatedPost = await User.findOneAndUpdate(
      { _id: user._id, 'posts._id': postId },
      { $set: { 'posts.$.title': title, 'posts.$.content': content } },
      { new: true }
    ).select('-password -confirmPassword');
    if (!updatedPost) {
      throw new ErrorWithStatus('Post not found', 404);
    }

    return {
      message: 'Post updated successfully',
      data: updatedPost,
    };
  } catch (err) {
    throw new ErrorWithStatus(err.message, 500);
  }
};

export const getAllPosts = async () => {
  try {
    // Find all users and populate their posts
    const usersWithPosts = await User.find({})
      .populate('posts')
      .select('-password -confirmPassword');

    // Extract posts from each user
    const allPosts = usersWithPosts.reduce((posts, user) => {
      posts.push(...user.posts);
      return posts;
    }, []);
    return {
      message: 'All posts retrieved successfully',
      data: allPosts,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};

export const getOnePost = async (postId) => {
  try {
    const user = await User.findOne({ 'posts._id': postId }).select(
      '-password -confirmPassword'
    );

    if (!user) {
      throw new ErrorWithStatus('Post not found', 404);
    }
    const post = user.posts.find((post) => post._id.toString() === postId);
    if (!post) {
      throw new ErrorWithStatus('Post not found', 404);
    }
    return {
      message: 'Post retrieved successfully',
      data: post,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, 500);
  }
};

export const deletePost = async (userEmail, postId) => {
  try {
    // Find the user who owns the post
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new ErrorWithStatus('User not found', 404);
    }

    // Find the post to be deleted

    const postToDelete = user.posts.find(
      (post) => post._id.toString() === postId
    );

    if (!postToDelete) {
      throw new ErrorWithStatus('Post not found', 404);
    }

    // Verify that the user is the creator of the post
    if (postToDelete.creator.toString() !== user._id.toString()) {
      throw new ErrorWithStatus(
        'Unauthorized: You are not the creator of this post',
        401
      );
    }

    // Remove the post from the user's posts array
    user.posts = user.posts.filter((post) => post._id.toString() !== postId);
    await user.save();

    return {
      message: 'Post deleted successfully',
      data: postToDelete,
    };
  } catch (error) {
    throw new ErrorWithStatus(error, error.status || 500);
  }
};
