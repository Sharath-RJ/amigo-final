"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Trainer", "User"], default: "User" },
    followers: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    isBlocked: { type: Boolean, default: false },
    profilePic: {
        type: String,
        default: "https://tse4.mm.bing.net/th?id=OIP.Ii15573m21uyos5SZQTdrAHaHa&pid=Api&P=0&h=180",
    },
    isLive: { type: Boolean, default: false },
    liveLink: { type: String },
    profileComplete: { type: Boolean, default: false },
    fullName: { type: String },
    bio: { type: String },
    specialization: { type: String },
    experience: { type: Number },
    qualifications: { type: String },
    timeZone: { type: String },
    hourlyRate: { type: Number },
    AvailableSlots: [{ dayOfWeek: String, timeRange: String, status: String }],
    MeetLink: { type: String },
    createdAt: { type: Date, default: Date.now },
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
