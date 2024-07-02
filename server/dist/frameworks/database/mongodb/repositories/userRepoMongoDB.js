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
exports.userRepoMongoDB = void 0;
const appointments_1 = require("../models/appointments");
const flulency_1 = require("../models/flulency");
const mockTest_1 = require("../models/mockTest");
const userModel_1 = require("../models/userModel");
class userRepoMongoDB {
    getAllUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loggedInUserId = id;
                const users = yield userModel_1.UserModel.find({
                    _id: { $ne: loggedInUserId },
                }).lean();
                const usersWithFollowStatus = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    // Check if the logged-in user is following this user
                    const isFollowing = yield userModel_1.UserModel.exists({
                        _id: loggedInUserId,
                        following: user._id,
                    });
                    console.log(isFollowing);
                    // Add follow status to user object
                    return Object.assign(Object.assign({}, user), { isFollowing: isFollowing });
                })));
                console.log(usersWithFollowStatus);
                return usersWithFollowStatus;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    followUser(followId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(followId, { $push: { followers: userId } }, { new: true });
                yield userModel_1.UserModel.findByIdAndUpdate(userId, { $push: { following: followId } }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error("Error following user:", error);
                throw error;
            }
        });
    }
    unfollowUser(followId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(followId, { $pull: { followers: userId } }, { new: true });
                yield userModel_1.UserModel.findByIdAndUpdate(userId, { $pull: { following: followId } }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error("Error unfollowing user:", error);
                throw error;
            }
        });
    }
    updateProfilePic(userId, profilePic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(userId, { $set: { profilePic: profilePic } }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error("Error updating profile pic:", error);
            }
        });
    }
    goLive(link, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(link, id);
                return yield userModel_1.UserModel.findByIdAndUpdate(id, { $set: { liveLink: link, isLive: true } }, { new: true });
            }
            catch (error) {
                console.error("Error updating profile pic:", error);
            }
        });
    }
    getLiveUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.find({ isLive: true });
            }
            catch (error) {
                console.error("Error getting live link:", error);
                throw error;
            }
        });
    }
    stopLive(link, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findByIdAndUpdate(id, { $set: { liveLink: link, isLive: false } }, { new: true });
            }
            catch (error) {
                console.error("Error getting live link:", error);
                throw error;
            }
        });
    }
    getLoggedInUserDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findById(id).populate('following followers');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadProgress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mockTest_1.MockTest.find({ user: id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loadFluency(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield flulency_1.fluencyModel.find({ user: id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getMyAppointments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointments_1.AppointmentModel.find({ client: id }).populate("trainer", "fullName profilePic specialization MeetLink");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.userRepoMongoDB = userRepoMongoDB;
