import { timeStamp } from "console"
import mongoose, { Schema, Document } from "mongoose"


interface ITempOtp extends Document {
    phoneNumber: string
    otp: string
    username: string
    email: string
    password: string
    role: string
    createdAt: Date
}

const TempOtpSchema: Schema = new Schema({
    phoneNumber: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: [ 'Trainer', 'User'], default: 'User' },
}, {timestamps:true})

export const TempOtp = mongoose.model<ITempOtp>("TempOtp", TempOtpSchema)
