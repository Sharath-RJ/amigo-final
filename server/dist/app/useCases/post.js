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
exports.PostUseCase = void 0;
class PostUseCase {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    addPost(images, caption, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.createPost(images, caption, user);
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.getAllPost();
        });
    }
    likePost(user, postid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.likePost(user, postid);
        });
    }
    unlikePost(user, postid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.unlikePost(user, postid);
        });
    }
    commentPost(postid, comment, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.commentPost(postid, comment, userid);
        });
    }
    showComments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.showComments(id);
        });
    }
    showLikes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.showLikes(id);
        });
    }
    getAllPostsofUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.getAllPostsofUser(id);
        });
    }
    deletePostImage(postid, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.deletePostImage(postid, image);
        });
    }
    deletePost(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.deletePost(postid);
        });
    }
    updatePost(postid, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.updatePost(postid, caption);
        });
    }
}
exports.PostUseCase = PostUseCase;
