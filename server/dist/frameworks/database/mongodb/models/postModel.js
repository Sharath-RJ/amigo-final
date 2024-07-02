"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const commentSchema = new Schema<IComment>({
//     text: { type: String, required: true },
//     postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
// })
const postSchema = new mongoose_1.Schema({
    image: { type: [String], required: true },
    caption: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: "not Published" },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            text: { type: String },
            postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            createdAt: { type: Date, default: Date.now },
        },
    ], // Use the comment schema
}, { timestamps: true });
// Create and export the Post model
const PostModel = (0, mongoose_1.model)("Post", postSchema);
exports.default = PostModel;
