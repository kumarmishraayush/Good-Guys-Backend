import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  creatingPost,
  getuserPost,
  updatePost,
  deletePost,
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
router.route("/Get-Post").get(getuserPost)




export default router;
