
    import mongoose, { Document, Schema } from "mongoose"

    export interface UserDocument extends Document {
        username: string
        email: string
        password: string
        phoneNumber: String
        followers: mongoose.Types.ObjectId[]
        following: mongoose.Types.ObjectId[]
        isBlocked: boolean
        profilePic: string
        isLive: boolean
        liveLink: string
        role: string
        profileComplete: boolean
        fullName: string
        bio: string
        specialization: string
        experience: number
        qualifications: string
        timeZone: string
        AvailableSlots: [{ dayOfWeek: String; timeRange: String, status: String }], 
        hourlyRate: number
        createdAt: Date
    }

    const UserSchema = new Schema({
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        role: { type: String, enum: ["Admin", "Trainer", "User"], default: "User" },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        isBlocked: { type: Boolean, default: false },
        profilePic: {
            type: String,
            default:
                "https://tse4.mm.bing.net/th?id=OIP.Ii15573m21uyos5SZQTdrAHaHa&pid=Api&P=0&h=180",
        },
        isLive: { type: Boolean, default: false },
        liveLink: { type: String },
        profileComplete: { type: Boolean, default: false },
        fullName: {type: String},
        bio: {type:String},
        specialization:{type:String},
        experience: {type:Number},
        qualifications:{type:String},
        timeZone: {type:String},
        hourlyRate: {type:Number},
        AvailableSlots:[{dayOfWeek:String, timeRange:String, status:String}],
        MeetLink: {type: String},
        createdAt: { type: Date, default: Date.now },
    })

    export const UserModel = mongoose.model<UserDocument>("User", UserSchema)
