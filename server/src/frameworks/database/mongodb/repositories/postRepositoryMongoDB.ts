import { afterEach } from "node:test";
import { postRepository } from "../../../../app/repositories/postRepository";
import { User } from "../../../../entities/user";
import PostModel from "../models/postModel";


export class postRepositoryMongoDB implements postRepository {
    async createPost(
        image: String[],
        caption: string,
        user: User
    ): Promise<boolean> {
        try {
            await PostModel.create({ image, caption, user })
            return true
        } catch (error) {
            console.error("Error creating post:", error)
            return false
        }
    }

    async getAllPost() {
        try {
           return await PostModel.find().populate({
               path: "user",
               select: "username profilePic",
           }).sort({ createdAt: -1 })
        } catch (error) {
            console.log(error)
        }
    }
    async likePost(user: any, postid: string): Promise<any> {
        try {
            const post = await PostModel.findOneAndUpdate(
                { _id: postid },
                { $push: { likes: user._id } },
                { new: true }
            )

            return post
        } catch (error) {
            console.log(error)
        }
    }
    async unlikePost(user: any, postid: string): Promise<any> {
        try {
            const post = await PostModel.findOneAndUpdate(
                { _id: postid },
                { $pull: { likes: user._id } },
                { new: true }
            )

            return post
        } catch (error) {
            console.log(error)
        }
    }

 async commentPost(postid: string, text: string, userid:string ): Promise<any> {
        try {
        
            const post = await PostModel.findByIdAndUpdate(
                postid ,
                { $push: { comments: { text: text, postedBy: userid } } },
                {upsert:true,new:true}
            )
    
            console.log(post)
            return post
        } catch (error) {
            console.log(error)
        }
    }



    async showComments(id:string): Promise<any> {
        try {
            const post = await PostModel.findById(id).select("comments").populate({path:"comments.postedBy",select:"username profilePic"})
            return post
        } catch (error) {
            console.log(error)
        }
    }
    async showLikes(id:string): Promise<any> {
        try {
             return await PostModel.findById(id).select("likes").populate({
                 path: "likes", 
                 select: "username profilePic", 
             })  
        } catch (error) {
          console.log(error)  
        }
     
}

async getAllPostsofUser(id:string): Promise<any> {
    try {
        return await PostModel.find({ user: id })
    } catch (error) {
        console.log(error)
    }
}

async deletePostImage(postid:string, imagestr:string):Promise<any>{
    try {
        return await PostModel.findByIdAndUpdate(postid,
            {$pull:{image:imagestr}},
            {new:true}

        )
        

    } catch (error) {
       console.log(error) 
    }
}

async deletePost(postid:string):Promise<any>{
    try {
        return await PostModel.findByIdAndDelete(postid)
    } catch (error) {
        console.log(error)
    }
}

async updatePost(postid: string, caption: string): Promise<any> {
    try {
        console.log(postid,caption)
        return await PostModel.findByIdAndUpdate(postid, {$set:{caption:caption}  }, { new: true })
    } catch (error) {
        console.log(error)
    }
}
}

