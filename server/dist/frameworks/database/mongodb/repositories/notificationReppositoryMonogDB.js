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
exports.notificationMongoDB = void 0;
const notificationModel_1 = require("../models/notificationModel");
class notificationMongoDB {
    sendNotification(message, receiverId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield notificationModel_1.NotificationModel.create({ message, recipient: receiverId, sender: id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getNotifications(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield notificationModel_1.NotificationModel.find({ recipient: id }).populate("sender", "username profilePic");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.notificationMongoDB = notificationMongoDB;
