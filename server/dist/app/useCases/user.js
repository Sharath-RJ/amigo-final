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
exports.userUseCase = void 0;
class userUseCase {
    constructor(_userRepoInterface) {
        this._userRepoInterface = _userRepoInterface;
    }
    getUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.getAllUsers(id);
        });
    }
    followUser(followId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.followUser(followId, userId);
        });
    }
    unfollowUser(followId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.unfollowUser(followId, userId);
        });
    }
    updateProfilePic(userId, profilePic) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.updateProfilePic(userId, profilePic);
        });
    }
    goLive(link, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.goLive(link, id);
        });
    }
    getLiveUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.getLiveUsers();
        });
    }
    stopLive(livelink, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.stopLive(livelink, id);
        });
    }
    getLoggedInUserDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.getLoggedInUserDetails(id);
        });
    }
    loadProgress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.loadProgress(id);
        });
    }
    loadFluency(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.loadFluency(id);
        });
    }
    getMyAppointments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepoInterface.getMyAppointments(id);
        });
    }
}
exports.userUseCase = userUseCase;
