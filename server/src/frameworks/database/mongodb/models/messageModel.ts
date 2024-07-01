import mongoose, { Document, Schema } from "mongoose"

export interface IMessage extends Document {
    sender: string
    receiver: string
    content: string
    timestamp: Date
    status: "sent" | "delivered" | "read"
}

const MessageSchema: Schema = new Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: { type: String },
    audioUrl: { type: String },
    timestamp: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["sent", "delivered", "read"],
        default: "sent",
    },
})

export const MessageModel = mongoose.model<IMessage>("Message", MessageSchema)
