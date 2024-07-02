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
exports.adminUseCase = void 0;
class adminUseCase {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.getAllUsers();
        });
    }
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.blockUser(id);
        });
    }
    unblockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.unblockUser(id);
        });
    }
    publishPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.publishPost(id);
        });
    }
    getPostDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.getPostDetails(id);
        });
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.getPosts();
        });
    }
    updateUser(id, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.updateUser(id, updatedUser);
        });
    }
}
exports.adminUseCase = adminUseCase;
