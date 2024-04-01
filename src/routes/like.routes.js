import { Router } from "express";
import {
    likePost,
    unlikePost,
    fetchLike
} from "../controllers/like.controllers.js"
const router = Router();

router.route("/like").post(likePost);
router.route("/unlike").post(unlikePost);
router.route("/getLike").get(fetchLike);

export default router;