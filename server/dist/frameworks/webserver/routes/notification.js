"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const notificationReppositoryMonogDB_1 = require("../../database/mongodb/repositories/notificationReppositoryMonogDB");
const notification_1 = require("../../../app/useCases/notification");
const notificationController_1 = require("../../../adapters/controllers/notificationController");
function notificationRouter() {
    const router = express_1.default.Router();
    const notificationRepository = new notificationReppositoryMonogDB_1.notificationMongoDB();
    const notifiactionUseCaseINstance = new notification_1.notificationUseCase(notificationRepository);
    const notificationControllerinstance = new notificationController_1.notificationController(notifiactionUseCaseINstance);
    router.post("/sendNotifiction", authMiddleware_1.default, notificationControllerinstance.sendNotification.bind(notificationControllerinstance));
    router.get("/getAllNotifications", authMiddleware_1.default, notificationControllerinstance.getNotifications.bind(notificationControllerinstance));
    return router;
}
exports.default = notificationRouter;
