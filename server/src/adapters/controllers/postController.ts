// postController.ts
import { Request, Response } from "express"
import { PostUseCase } from "../../app/useCases/post"
import { postRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/postRepositoryMongoDB"

interface customRequest extends Request{
    user?:any;

}

export class PostController {
    constructor(private postUseCase: PostUseCase) {}

    async addPost(req: Request, res: Response): Promise<void> {
        try {
            const { caption, user } = req.body
            const files = req.files as Express.Multer.File[]

            const imagePaths = files.map((file) => file.filename)

            const success = await this.postUseCase.addPost(
                imagePaths,
                caption,
                user
            )

            if (success) {
                res.status(201).json({
                    message: "Post created successfully",
                })
            } else {
                res.status(400).json({ error: "Post creation failed" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    async getAllPosts(req: Request, res: Response) {
        const posts = await this.postUseCase.getAllPosts()
        if (posts) {
            res.status(201).json(posts)
        }
    }

    async likePost(req: customRequest, res: Response) {
        try {
            const { postid } = req.params
            const success = await this.postUseCase.likePost(req.user, postid)
            if (success) {
                res.status(201).json({
                    message: "Post liked successfully",
                })
            } else {
                res.status(400).json({ error: "Post like failed" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    async unlikePost(req: customRequest, res: Response) {
        try {
            const { postid } = req.params
            const success = await this.postUseCase.unlikePost(req.user, postid)
            if (success) {
                res.status(201).json({
                    message: "Post unliked successfully",
                })
            } else {
                res.status(400).json({ error: "Post unlike failed" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    async commentPost(req: customRequest, res: Response) {
        const { id } = req.params
        const { comment } = req.body
        const success = await this.postUseCase.commentPost(
            id,
            comment,
            req.user._id
        )
        console.log("commmetntttttttttttt   ", success)
        if (success) {
            res.status(201).json(success)
        } else {
            res.status(400).json({ error: "Comment failed" })
        }
    }

    async showComments(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const comments = await this.postUseCase.showComments(id)
            if (comments) {
                res.status(201).json(comments)
            } else {
                res.status(400).json({ error: "Comment failed" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async showLikes(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const likes = await this.postUseCase.showLikes(id)
            if (likes) {
                res.status(201).json(likes)
            } else {
                res.status(400).json({ error: "Like failed" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAllPostsofUser(req: customRequest, res: Response): Promise<void> {
        try {
            console.log("nnnnnnnnnnnnnnnnnnnnnnnn", req.user._id)
            if (req.user && req.user._id) {
                const posts = await this.postUseCase.getAllPostsofUser(
                    req.user._id
                )
                if (posts) {
                    res.status(201).json(posts)
                } else {
                    res.status(400).json({ error: "Failed to fetch posts" })
                }
            } else {
                res.status(400).json({ error: "User not authenticated" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }

    async deletePostImage(req: customRequest, res: Response): Promise<void> {
        try {
            const { postid, image } = req.params
            const success = await this.postUseCase.deletePostImage(
                postid,
                image
            )
            if(success){
                res.status(201).json(success)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deletePost(req:customRequest, res:Response):Promise<any>{
        try {
            const {postid}= req.params
            const success = await this.postUseCase.deletePost(postid)
            if(success){
                res.status(201).json(success) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updatePost(req:customRequest, res:Response):Promise<any>{
        try {
            console.log("hello")
            const {postid}= req.params
            const {caption}= req.body
            const success = await this.postUseCase.updatePost(postid,caption)
            console.log(success)
            if(success){
                res.status(201).json(success) 
            }
        } catch (error) {
            console.log(error)
        }
    }
}
