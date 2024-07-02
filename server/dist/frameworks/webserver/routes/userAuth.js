"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthControllers_1 = require("../../../adapters/controllers/userAuthControllers");
const userAuth_1 = require("../../../app/useCases/auth/userAuth");
const userRepositoryMongoDB_1 = require("../../../frameworks/database/mongodb/repositories/userRepositoryMongoDB");
const authService_1 = require("../../../frameworks/services/authService");
function AuthRouter() {
    const router = express_1.default.Router();
    const userRepository = new userRepositoryMongoDB_1.UserRepositoryMongo();
    const authService = new authService_1.AuthService();
    const authUseCase = new userAuth_1.AuthUseCase(userRepository, authService);
    const authController = new userAuthControllers_1.AuthController(authUseCase);
    // router.post("/register", authController.register.bind(authController))
    router.post("/login", authController.login.bind(authController));
    router.post("/send-otp", authController.generateOtp.bind(authController));
    // router.get("/generateOtp", authController.generateOtp.bind(authController))
    router.post("/verify-otp", authController.verifyOtp.bind(authController));
    return router;
}
exports.default = AuthRouter;
