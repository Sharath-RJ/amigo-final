import mongoose, { Schema, Document } from "mongoose"


interface ITempOtp extends Document {
    phoneNumber: string
    otp: string
    createdAt: Date
    username: string
    email: string
    password: string
    role:string
}

const TempOtpSchema: Schema = new Schema({
    phoneNumber: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Trainer', 'User'], default: 'User' },
})

export const TempOtp = mongoose.model<ITempOtp>("TempOtp", TempOtpSchema)
