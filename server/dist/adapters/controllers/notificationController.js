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
exports.notificationController = void 0;
const notificationModel_1 = require("../../frameworks/database/mongodb/models/notificationModel");
class notificationController {
    constructor(_notificationUseCase, io) {
        this._notificationUseCase = _notificationUseCase;
        this.io = io;
    }
    sendNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { message, receiverId } = req.body;
                const notified = yield this._notificationUseCase.sendNotification(message, receiverId, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                const notificationCount = yield notificationModel_1.NotificationModel.countDocuments({ recipient: receiverId });
                this.io.emit("notificationCountUpdate", notificationCount);
                res.json(notified);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while sending the notification.' });
            }
        });
    }
    getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const notifications = yield this._notificationUseCase.getNotifications((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", notifications);
                res.json(notifications);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching notifications.' });
            }
        });
    }
}
exports.notificationController = notificationController;
