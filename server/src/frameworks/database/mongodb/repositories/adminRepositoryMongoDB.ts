import { adminRepository } from "../../../../app/repositories/adminRepository";
import PostModel from "../models/postModel";
import { UserModel } from "../models/userModel";

export class adminRepositoryMongoDB implements adminRepository {
    async getAllUsers(): Promise<any> {
        try {
            const users = await UserModel.find()
            return users
        } catch (error) {}
    }

    async blockUser(id: any): Promise<any> {
        try {
            const user = await UserModel.findOneAndUpdate(
                { _id: id },
                { isBlocked: true }
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async unblockUser(id: any): Promise<any> {
        try {
            const user = await UserModel.findOneAndUpdate(
                { _id: id },
                { isBlocked: false }
            )
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async publishPost(id: string): Promise<any> {
        try {
            const post = await PostModel.findByIdAndUpdate(
                id,
                { status: "Published" },
                { new: true }
            )
            return post
        } catch (error) {
            console.error("Error getting posts:", error)
            return []
        }
    }

    async getPostDetails(id: String): Promise<any> {
        try {
            const posts = await PostModel.findById(id).populate(
                "user",
                "username"
            )
            console.log("posts db")
            return posts
        } catch (error) {
            console.error("Error getting posts:", error)
            return []
        }
    }

    async getPosts(): Promise<any> {
        try {
            const posts = await PostModel.find().populate("user", "username")
            console.log("posts db")
            return posts
        } catch (error) {
            console.error("Error getting posts:", error)
            return []
        }
    }

    async updateUser(id: string, updatedUser: any): Promise<any> {
        try {
            return  await UserModel.findByIdAndUpdate(
                id,
                { $set: updatedUser },
                { new: true }
            )
    
        } catch (error) {
            console.log(error)
        }
    }
}