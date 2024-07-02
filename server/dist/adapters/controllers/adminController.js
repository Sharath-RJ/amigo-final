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
exports.adminController = void 0;
class adminController {
    constructor(_adminusecase) {
        this._adminusecase = _adminusecase;
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this._adminusecase.getAllUsers();
                if (users)
                    res.status(200).json(users);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    blockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this._adminusecase.blockUser(id);
                if (user)
                    res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    unblockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this._adminusecase.unblockUser(id);
                if (user)
                    res.status(200).json(user);
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
                const post = yield this._adminusecase.publishPost(id);
                if (post) {
                    res.status(200).json(post);
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
                const post = yield this._adminusecase.getPostDetails(id);
                if (post) {
                    res.status(200).json(post);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("getposts controller");
                const posts = yield this._adminusecase.getPosts();
                if (posts) {
                    res.status(200).json(posts);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { updatedUser } = req.body;
                console.log(updatedUser);
                console.log(req.body);
                const user = yield this._adminusecase.updateUser(id, req.body);
                if (user) {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.adminController = adminController;
