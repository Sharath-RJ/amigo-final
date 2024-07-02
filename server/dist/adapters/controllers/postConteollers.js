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
exports.postConteoller = void 0;
class postConteoller {
    constructor(postUseCase) {
        this.postUseCase = postUseCase;
    }
    addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { caption, user } = req.body;
                const files = req.files;
                const imagePaths = files.map((file) => file.filename);
                const success = yield this.postUseCase.addPost(imagePaths, caption, user);
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
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("getposts controller");
                const posts = yield this.postUseCase.getPosts();
                if (posts) {
                    res.status(200).json(posts);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getPostDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield this.postUseCase.getPostDetails(id);
                if (post) {
                    res.status(200).json(post);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    publishPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield this.postUseCase.publishPost(id);
                if (post) {
                    res.status(200).json(post);
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
                const { id } = req.params;
                const post = yield this.postUseCase.deletePost(id);
                if (post) {
                    res.status(200).json(post);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const posts = yield this.postUseCase.getAllPosts(id);
                if (posts) {
                    res.status(200).json(posts);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    likePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, userid } = req.params;
                console.log(id);
                console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", userid);
                const post = yield this.postUseCase.likePost(id, userid);
                if (post) {
                    res.status(200).json(post);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    commentPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId, comment } = req.body;
                const post = yield this.postUseCase.commentPost(id, comment, userId);
                if (post) {
                    res.status(200).json(post);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    showComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comments = yield this.postUseCase.showComments(id);
                if (comments) {
                    res.status(200).json(comments);
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
                    res.status(200).json(likes);
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
                const { id } = req.params;
                const posts = yield this.postUseCase.getAllPostsofUser(id);
                console.log("post of the logged user", posts);
                if (posts) {
                    res.status(200).json(posts);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.postConteoller = postConteoller;
