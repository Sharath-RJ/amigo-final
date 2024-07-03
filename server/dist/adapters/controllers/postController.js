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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
class PostController {
    constructor(postUseCase) {
        this.postUseCase = postUseCase;
    }
    addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { caption, user } = req.body;
                const files = req.files;
                const imageUrls = files.map((file) => file.path); // Cloudinary URLs are in `path`
                const success = yield this.postUseCase.addPost(imageUrls, caption, user);
                if (success) {
                    res.status(201).json({
                        message: "Post created successfully",
                    });
                }
                else {
                    res.status(400).json({ error: "Post creation failed" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.postUseCase.getAllPosts();
            if (posts) {
                res.status(201).json(posts);
            }
        });
    }
    likePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postid } = req.params;
                const success = yield this.postUseCase.likePost(req.user, postid);
                if (success) {
                    res.status(201).json({
                        message: "Post liked successfully",
                    });
                }
                else {
                    res.status(400).json({ error: "Post like failed" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    unlikePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postid } = req.params;
                const success = yield this.postUseCase.unlikePost(req.user, postid);
                if (success) {
                    res.status(201).json({
                        message: "Post unliked successfully",
                    });
                }
                else {
                    res.status(400).json({ error: "Post unlike failed" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    commentPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { comment } = req.body;
            const success = yield this.postUseCase.commentPost(id, comment, req.user._id);
            console.log("commmetntttttttttttt   ", success);
            if (success) {
                res.status(201).json(success);
            }
            else {
                res.status(400).json({ error: "Comment failed" });
            }
        });
    }
    showComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comments = yield this.postUseCase.showComments(id);
                if (comments) {
                    res.status(201).json(comments);
                }
                else {
                    res.status(400).json({ error: "Comment failed" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    showLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const likes = yield this.postUseCase.showLikes(id);
                if (likes) {
                    res.status(201).json(likes);
                }
                else {
                    res.status(400).json({ error: "Like failed" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllPostsofUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("nnnnnnnnnnnnnnnnnnnnnnnn", req.user._id);
                if (req.user && req.user._id) {
                    const posts = yield this.postUseCase.getAllPostsofUser(req.user._id);
                    if (posts) {
                        res.status(201).json(posts);
                    }
                    else {
                        res.status(400).json({ error: "Failed to fetch posts" });
                    }
                }
                else {
                    res.status(400).json({ error: "User not authenticated" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    deletePostImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postid, image } = req.params;
                const success = yield this.postUseCase.deletePostImage(postid, image);
                if (success) {
                    res.status(201).json(success);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postid } = req.params;
                const success = yield this.postUseCase.deletePost(postid);
                if (success) {
                    res.status(201).json(success);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("hello");
                const { postid } = req.params;
                const { caption } = req.body;
                const success = yield this.postUseCase.updatePost(postid, caption);
                console.log(success);
                if (success) {
                    res.status(201).json(success);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.PostController = PostController;
