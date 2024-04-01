import express from 'express';
import {  asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Post } from '../models/post.model.js'; // Assuming your model is defined in this path

const router = express.Router();

// Create a post



const creatingPost = asyncHandler(async (req, res)=>
{
    try {
        const { user, postImage, description } = req.body;
         
        const post = new Post({ user, postImage, description });
        await post.save();
        res.status(201).json(post);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
});

// Get all posts of a user

const getuserPost = asyncHandler(async(req,res)=>
{
    try {
        const userId = req.body.userId;
        const posts = await Post.find({ user: userId }).populate([
          {
              path: 'likes',
              select: '-password -refreshToken'
          },
          {
              path: 'dislikes',
              select: '-password -refreshToken'
          }
      ]);
        res.json(posts);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})
 

// Update a post

const updatePost = asyncHandler(async(req,res)=>
{
    try {
        const postId = req.body.postId;
        const postOwner = req.body.postOwnerId;
        const posts = await Post.findById(postId);
        if(posts.user != postOwner)return res.status(404).json({error : "Sorry It's Not Your Post You Can't Delete"})
        const { postImage, description } = req.body;
        const post = await Post.findByIdAndUpdate(postId, { postImage, description }, { new: true });
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
      } catch (error) {
        res.status(400).json({ error: error.message });
      } 
})


// Delete a post

const deletePost = asyncHandler(async(req,res)=>
{
    try {
        const postId = req.body.postId;
        const postOwner = req.body.postOwnerId;
        
        const posts = await Post.findById(postId);
        
        if(posts.user != postOwner)return res.status(404).json({error : "Sorry It's Not Your Post You Can't Delete"})
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})


export {
    creatingPost,
    getuserPost,
    updatePost,
    deletePost
};
