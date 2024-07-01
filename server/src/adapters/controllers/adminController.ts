import { adminUseCase } from "../../app/useCases/admin";
import { Request, Response } from "express"

export class adminController {
    constructor(private _adminusecase: adminUseCase) {}

    async getAllUsers(req: Request, res: Response): Promise<any> {
        try {
            const users = await this._adminusecase.getAllUsers()
            if (users)  res.status(200).json(users)
        } catch (error) {
            console.log(error)
        }
    }

    async blockUser(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params
            const user = await this._adminusecase.blockUser(id)
            if (user)  res.status(200).json(user)
        } catch (error) {
            console.log(error)
        }
    }

    async unblockUser(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params
            const user = await this._adminusecase.unblockUser(id)
            if (user) res.status(200).json(user)
        } catch (error) {
            console.log(error)
        }
    }

    async publishPost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const post = await this._adminusecase.publishPost(id)
            if (post) {
                res.status(200).json(post)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getPostDetails(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const post = await this._adminusecase.getPostDetails(id)
            if (post) {
                res.status(200).json(post)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getPosts(req: Request, res: Response): Promise<void> {
        try {
            console.log("getposts controller")
            const posts = await this._adminusecase.getPosts()
            if (posts) {
                res.status(200).json(posts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { updatedUser }= req.body
            console.log(updatedUser)
            console.log(req.body)
            const user = await this._adminusecase.updateUser(id, req.body)
            if (user) { res.status(200).json(user) }
        } catch (error) {
            console.log(error)
        }
    }
}