"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../../adapters/controllers/userController");
const userRepoMongoDB_1 = require("../../database/mongodb/repositories/userRepoMongoDB");
const user_1 = require("../../../app/useCases/user");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const checkBlockMiddleware_1 = require("../middlewares/checkBlockMiddleware");
function userRoute() {
    const router = express_1.default.Router();
    const userRepository = new userRepoMongoDB_1.userRepoMongoDB();
    const userUseCaseInstance = new user_1.userUseCase(userRepository);
    const userControllerInstance = new userController_1.userConteoller(userUseCaseInstance);
    router.get("/getAllUsers/:userId", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, userControllerInstance.getAllUsers.bind(userControllerInstance));
    router.put("/follow/:followId/:userId", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, userControllerInstance.followUser.bind(userControllerInstance));
    router.put("/unfollow/:followId/:userId", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, userControllerInstance.unfollowUser.bind(userControllerInstance));
    router.put("/updateProfilePic/:userId", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, userControllerInstance.updateProfilePic.bind(userControllerInstance));
    router.put("/goLive", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, userControllerInstance.goLive.bind(userControllerInstance));
    router.get("/getLiveUsers", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, userControllerInstance.getLiveUsers.bind(userControllerInstance));
    router.put("/stopLive", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, userControllerInstance.stopLive.bind(userControllerInstance));
    router.get("/getLoggedInUserDetails", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, userControllerInstance.getLoggedInUserDetails.bind(userControllerInstance));
    router.get("/loadProgress", authMiddleware_1.default, userControllerInstance.loadProgress.bind(userControllerInstance));
    router.get("/loadFluency", authMiddleware_1.default, userControllerInstance.loadFluency.bind(userControllerInstance));
    router.get("/getMyAppointments", authMiddleware_1.default, userControllerInstance.getMyAppointments.bind(userControllerInstance));
    return router;
}
exports.default = userRoute;
