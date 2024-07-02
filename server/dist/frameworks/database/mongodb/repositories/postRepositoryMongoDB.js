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
exports.postRepositoryMongoDB = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
class postRepositoryMongoDB {
    createPost(image, caption, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield postModel_1.default.create({ image, caption, user });
                return true;
            }
            catch (error) {
                console.error("Error creating post:", error);
                return false;
            }
        });
    }
    getAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield postModel_1.default.find().populate({
                    path: "user",
                    select: "username profilePic",
                }).sort({ createdAt: -1 });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    likePost(user, postid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel_1.default.findOneAndUpdate({ _id: postid }, { $push: { likes: user._id } }, { new: true });
                return post;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    unlikePost(user, postid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel_1.default.findOneAndUpdate({ _id: postid }, { $pull: { likes: user._id } }, { new: true });
                return post;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    commentPost(postid, text, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel_1.default.findByIdAndUpdate(postid, { $push: { comments: { text: text, postedBy: userid } } }, { upsert: true, new: true });
                console.log(post);
                return post;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    showComments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel_1.default.findById(id).select("comments").populate({ path: "comments.postedBy", select: "username profilePic" });
                return post;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    showLikes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield postModel_1.default.findById(id).select("likes").populate({
                    path: "likes",
                    select: "username profilePic",
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllPostsofUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield postModel_1.default.find({ user: id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deletePostImage(postid, imagestr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield postModel_1.default.findByIdAndUpdate(postid, { $pull: { image: imagestr } }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deletePost(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield postModel_1.default.findByIdAndDelete(postid);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updatePost(postid, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(postid, caption);
                return yield postModel_1.default.findByIdAndUpdate(postid, { $set: { caption: caption } }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.postRepositoryMongoDB = postRepositoryMongoDB;
