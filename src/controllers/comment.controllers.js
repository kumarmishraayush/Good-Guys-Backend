 import {Comment} from "../models/comment.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";


// Route for creating a new comment

const newComments = asyncHandler(async(req,res)=>
{
    try {
        const { user, post, content } = req.body;
        const newComment = new Comment({ user, post, content });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
      } catch (err) {
        res.status(400).json({ message: err.message });
      } 
})
 

// Route for deleting a comment by ID
const deleteComments = asyncHandler(async(req,res)=>
{
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.body.id);
        if (!deletedComment) {
          return res.status(404).json({ message: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

//router for fetching all the comments
const fetchComment = asyncHandler(async(req,res)=>
{
    try {
       
        const comments = await Comment.find({ post: req.body.postId });
        res.json(comments);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

 

export {
    newComments,
    deleteComments,
    fetchComment
};