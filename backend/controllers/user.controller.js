import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  res.status(200).json(user.savedPost);
};

export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const isSaved = user.savedPost.some((p) => p === postId);

  if (!isSaved) {
    user.savedPost.push(postId);
    await user.save();
  } else {
    user.savedPost.pull(postId);
    await user.save();
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};
