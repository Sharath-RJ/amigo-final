import express, { Router } from "express"
import { PostController } from "../../../adapters/controllers/postController"
import { PostUseCase } from "../../../app/useCases/post"
import { postRepositoryMongoDB } from "../../../frameworks/database/mongodb/repositories/postRepositoryMongoDB"
import upload from "../../../frameworks/webserver/middlewares/multerMiddleware"
import authenticate from "../middlewares/authMiddleware"
import { isBlocked } from "../middlewares/checkBlockMiddleware"

export default function PostsRouter(): Router {
    const router = express.Router()

    const postRepository = new postRepositoryMongoDB()
    const postUseCase = new PostUseCase(postRepository)
    const postController = new PostController(postUseCase)

    router.post(
        "/addPost",
        upload.array("images"),
        authenticate,
        isBlocked,
        postController.addPost.bind(postController)
    )

    router.get("/getAllPosts", postController.getAllPosts.bind(postController))
    

    
    router.put(
        "/likePost/:postid",
        authenticate,
        isBlocked,
        postController.likePost.bind(postController)
    )
    router.put(
        "/unlikePost/:postid",
        authenticate,
        isBlocked,
        postController.unlikePost.bind(postController)
    )
    // router.delete("/delete/:id", postController.deletePost.bind(postController))

    router.put(
        "/commentPost/:id",
        authenticate,
        isBlocked,
        postController.commentPost.bind(postController)
    )
    router.get(
        "/showComments/:id",
        authenticate,
        isBlocked,
        postController.showComments.bind(postController)
    )
    router.get("/showLikes/:id",authenticate,isBlocked, postController.showLikes.bind(postController))
    router.get(
        "/getAllPostsofUser/:id", authenticate,isBlocked,
        postController.getAllPostsofUser.bind(postController)
    )
    router.delete(
        "/deletePostImage/:postid/:image",
        authenticate,
        isBlocked,
        postController.deletePostImage.bind(postController)
    )
    router.delete(
        "/deletePost/:postid",
       authenticate,isBlocked,
        postController.deletePost.bind(postController)
    )

    router.put(
        "/updatePost/:postid",
        authenticate,
        isBlocked,
        postController.updatePost.bind(postController)
    )

    return router
}
