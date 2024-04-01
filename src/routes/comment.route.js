import { Router } from "express";
import {
    newComments,
    deleteComments,
    fetchComment
} from "../controllers/comment.controllers.js"
const router = Router();

router.route("/newComment").post(newComments)
router.route("/deleteComments").delete(deleteComments);
router.route("/fetchComment").get(fetchComment)

export default router;