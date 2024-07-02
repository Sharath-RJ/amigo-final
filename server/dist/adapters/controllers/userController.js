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
exports.userConteoller = void 0;
class userConteoller {
    constructor(_userUseCase) {
        this._userUseCase = _userUseCase;
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this._userUseCase.getUsers(req.params.userId);
                console.log(users);
                if (users) {
                    console.log(users);
                    res.status(200).json(users);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    followUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followId, userId } = req.params;
                const user = yield this._userUseCase.followUser(followId, userId);
                console.log(user);
                if (user) {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    unfollowUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followId, userId } = req.params;
                const user = yield this._userUseCase.unfollowUser(followId, userId);
                if (user) {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateProfilePic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { profilePic } = req.body;
                const user = yield this._userUseCase.updateProfilePic(userId, profilePic);
                if (user) {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    goLive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { livelink } = req.body;
                const user = yield this._userUseCase.goLive(livelink, req.user._id);
                if (user) {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getLiveUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this._userUseCase.getLiveUsers();
                if (users) {
                    res.status(200).json(users);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    stopLive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { livelink } = req.body;
                const user = yield this._userUseCase.stopLive(livelink, req.user._id);
                if (user) {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getLoggedInUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield this._userUseCase.getLoggedInUserDetails(req.user._id);
                console.log("ooooooooooooooooooooooooo", userDetails);
                if (userDetails) {
                    res.status(200).json(userDetails);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const progress = yield this._userUseCase.loadProgress((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                if (progress) {
                    res.status(200).json(progress);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadFluency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const fluency = yield this._userUseCase.loadFluency((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                if (fluency) {
                    res.status(200).json(fluency);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getMyAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const appointments = yield this._userUseCase.getMyAppointments((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                console.log(appointments);
                if (appointments) {
                    res.status(200).json(appointments);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.userConteoller = userConteoller;
