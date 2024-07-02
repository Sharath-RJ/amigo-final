"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRepositoryMongoDB_1 = require("../../database/mongodb/repositories/adminRepositoryMongoDB");
const admin_1 = require("../../../app/useCases/admin");
const adminController_1 = require("../../../adapters/controllers/adminController");
function adminRouter() {
    const router = express_1.default.Router();
    const adminRepository = new adminRepositoryMongoDB_1.adminRepositoryMongoDB();
    const adminUseCaseInstance = new admin_1.adminUseCase(adminRepository);
    const adminControllerInstance = new adminController_1.adminController(adminUseCaseInstance);
    router.get("/getAllUsers", adminControllerInstance.getAllUsers.bind(adminControllerInstance));
    router.put("/blockUser/:id", adminControllerInstance.blockUser.bind(adminControllerInstance));
    router.put("/unblockUser/:id", adminControllerInstance.unblockUser.bind(adminControllerInstance));
    router.patch("/publish/:id", adminControllerInstance.publishPost.bind(adminControllerInstance));
    router.get("/viewPost/:id", adminControllerInstance.getPostDetails.bind(adminControllerInstance));
    router.get("/getPosts", adminControllerInstance.getPosts.bind(adminControllerInstance));
    router.patch("/updateUser/:id", adminControllerInstance.updateUser.bind(adminControllerInstance));
    return router;
}
exports.default = adminRouter;
