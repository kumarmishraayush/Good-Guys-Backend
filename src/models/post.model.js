import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postImage: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes:[
      {
      
          type: Schema.Types.ObjectId,
          ref: "User",
        
      },
    ],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
