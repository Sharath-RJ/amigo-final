"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../../../adapters/controllers/postController");
const post_1 = require("../../../app/useCases/post");
const postRepositoryMongoDB_1 = require("../../../frameworks/database/mongodb/repositories/postRepositoryMongoDB");
const multerMiddleware_1 = __importDefault(require("../../../frameworks/webserver/middlewares/multerMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const checkBlockMiddleware_1 = require("../middlewares/checkBlockMiddleware");
function PostsRouter() {
    const router = express_1.default.Router();
    const postRepository = new postRepositoryMongoDB_1.postRepositoryMongoDB();
    const postUseCase = new post_1.PostUseCase(postRepository);
    const postController = new postController_1.PostController(postUseCase);
    router.post("/addPost", multerMiddleware_1.default.array("images"), authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.addPost.bind(postController));
    router.get("/getAllPosts", postController.getAllPosts.bind(postController));
    router.put("/likePost/:postid", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.likePost.bind(postController));
    router.put("/unlikePost/:postid", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.unlikePost.bind(postController));
    // router.delete("/delete/:id", postController.deletePost.bind(postController))
    router.put("/commentPost/:id", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.commentPost.bind(postController));
    router.get("/showComments/:id", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.showComments.bind(postController));
    router.get("/showLikes/:id", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.showLikes.bind(postController));
    router.get("/getAllPostsofUser/:id", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.getAllPostsofUser.bind(postController));
    router.delete("/deletePostImage/:postid/:image", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.deletePostImage.bind(postController));
    router.delete("/deletePost/:postid", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.deletePost.bind(postController));
    router.put("/updatePost/:postid", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, postController.updatePost.bind(postController));
    return router;
}
exports.default = PostsRouter;
