import mongoose, { Schema, Document } from "mongoose"



const mockTestSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    proficiencyLevel: { type: String, required: true },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

export const MockTest = mongoose.model("MockTest", mockTestSchema)
