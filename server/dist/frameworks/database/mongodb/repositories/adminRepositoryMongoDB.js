"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepositoryMongoDB = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const userModel_1 = require("../models/userModel");
class adminRepositoryMongoDB {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.UserModel.find();
                return users;
            }
            catch (error) { }
        });
    }
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.UserModel.findOneAndUpdate({ _id: id }, { isBlocked: true });
                return user;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    unblockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.UserModel.findOneAndUpdate({ _id: id }, { isBlocked: false });
                return user;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    publishPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel_1.default.findByIdAndUpdate(id, { status: "Published" }, { new: true });
                return post;
            }
            catch (error) {
                console.error("Error getting posts:", error);
                return [];
            }
        });
    }
    getPostDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postModel_1.default.findById(id).populate("user", "username");
                console.log("posts db");
                return posts;
            }
            catch (error) {
                console.error("Error getting posts:", error);
                return [];
            }
        });
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postModel_1.default.find().populate("user", "username");
                console.log("posts db");
                return posts;
            }
            catch (error) {
                console.error("Error getting posts:", error);
                return [];
            }
        });
    }
    updateUser(id, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findByIdAndUpdate(id, { $set: updatedUser }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.adminRepositoryMongoDB = adminRepositoryMongoDB;
