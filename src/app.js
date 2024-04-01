import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// User Routes
import userRouter from './routes/user.routes.js'
import loginUser from './routes/user.routes.js'
import logoutUser from "./routes/user.routes.js"
import changeCurrentPassword from "./routes/user.routes.js"
import getCurrentUser from "./routes/user.routes.js"
import updateAccountDetails from "./routes/user.routes.js"
import updateUserAvatar from "./routes/user.routes.js"
import updateUserCoverImage from "./routes/user.routes.js"
import followUser  from "./routes/user.routes.js"
import  unfollowUser from "./routes/user.routes.js"
import refreshAccessToken from "./routes/user.routes.js"
app.use("/api/v1/users",getCurrentUser)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/users",loginUser)
app.use("/api/v1/users",logoutUser)
app.use("/api/v1/users",changeCurrentPassword)
app.use("/api/v1/users",updateAccountDetails)
app.use("/api/v1/users",updateUserAvatar)
app.use("/api/v1/users",updateUserCoverImage)
app.use("/api/v1/users",followUser)
app.use("/api/v1/users",unfollowUser)
app.use("/api/v1/users",refreshAccessToken)


//Post Routes

import creatingPost from "./routes/post.routes.js"
import deletePost from "./routes/post.routes.js"
import updatePost from "./routes/post.routes.js"
import getuserPost from "./routes/post.routes.js"

app.use("/api/v1/posts",creatingPost)
app.use("/api/v1/posts",deletePost)
app.use("/api/v1/posts",updatePost)
app.use("/api/v1/posts",getuserPost)



//Like Post
import likePost from "./routes/like.routes.js"
import unlike from "./routes/like.routes.js"
import fetchLike from "./routes/like.routes.js"
app.use("/api/v1/likes",likePost);
app.use("/api/v1/likes",unlike);
app.use("/api/v1/likes",fetchLike);


//Comment Routes

import newComments  from "./routes/comment.route.js"
import deleteComments  from "./routes/comment.route.js"
import fetchComment  from "./routes/comment.route.js"

app.use("/api/v1/comments",newComments);
app.use("/api/v1/comments",deleteComments)
app.use("/api/v1/comments",fetchComment)













export { app }