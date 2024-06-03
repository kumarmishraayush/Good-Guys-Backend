import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  creatingPost,
  getuserPost,
  updatePost,
  deletePost,
  getAllPosts,
} from "../controllers/post.controllers.js";

const router = Router();

router.route("/create").post(
  upload.fields([
    {
      name: "postImage",
      maxCount: 1,
    },
  ]),
  creatingPost
);

router.route("/delete").delete(deletePost)
router.route("/update").post(upload.single("postImage"),updatePost)
router.route("/Get-Post").post(getuserPost)
router.route("/Get-AllPost").get(getAllPosts)




export default router;
