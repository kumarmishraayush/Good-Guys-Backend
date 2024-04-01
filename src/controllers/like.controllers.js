import express from "express";
import { Like } from "../models/like.model.js"; // Adjust the path as per your project structure
import { Post } from "../models/post.model.js"; // Assuming you have a Post model
import { User } from "../models/user.model.js"; // Assuming you have a User model
import { asyncHandler } from "../utils/asyncHandler.js";
import { Dislike } from "../models/dislike.model.js";

const router = express.Router();

// Like a post

const likePost = asyncHandler(async (req, res) => {
  try {
    const { userId, postId } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      await Like.deleteOne({ user: userId, post: postId });
      const index = post.likes.indexOf(userId);
      if (index !== -1) {
        post.likes.splice(index, 1);
      }

      // Save the updated post
      await post.save();
      return res.status(200).json({ message: "Post unliked successfully" });
    }
    post.likes.push(userId);
    // Save the updated post
    await post.save();
    console.log(post);
    // Create a new like
    const newLike = new Like({ user: userId, post: postId });
    await newLike.save();

    return res.status(201).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Unlike a post
const unlikePost = asyncHandler(async (req, res) => {
  try {
    const { userId, postId } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user already liked the post
    const existingLike = await Dislike.findOne({ user: userId, post: postId });
    if (existingLike) {
      await Dislike.deleteOne({ user: userId, post: postId });
      const index = post.dislikes.indexOf(userId);
      if (index !== -1) {
        post.dislikes.splice(index, 1);
      }

      // Save the updated post
      await post.save();

      return res.status(200).json({ message: "Post undisliked successfully" });
    }
    post.dislikes.push(userId);
    // Save the updated post
    await post.save();
    console.log(post);
    // Create a new like
    const newLike = new Dislike({ user: userId, post: postId });
    await newLike.save();

    return res.status(201).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch all likes of a post and the users who liked it

const fetchLike = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.body;

    // Fetch all likes for the post
    const likes = await Like.find({ post: postId }).populate(
      "user",
      "username"
    ); // Assuming 'username' is a field in your User model

    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export { likePost, unlikePost, fetchLike };
