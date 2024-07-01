import { Schema, model, Document, Types } from "mongoose"

// Define the interface for the Comment subdocument
interface IComment {
    text: string
    postedBy: Types.ObjectId
}

// Define the interface for the Post document
interface IPost extends Document {
    image: string[]
    caption: string
    user: Types.ObjectId
    status: string
    createdAt: Date
    updatedAt: Date
    likes: Types.ObjectId[]
    comments: []
}

// const commentSchema = new Schema<IComment>({
//     text: { type: String, required: true },
//     postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
// })

const postSchema = new Schema<IPost>(
    {
        image: { type: [String], required: true },
        caption: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, default: "not Published" },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comments: [
            {
                text: { type: String },
                postedBy: { type: Schema.Types.ObjectId, ref: "User" },
                createdAt: { type: Date, default: Date.now },
            },
        ], // Use the comment schema
    },
    { timestamps: true }
)

// Create and export the Post model
const PostModel = model<IPost>("Post", postSchema)

export default PostModel
