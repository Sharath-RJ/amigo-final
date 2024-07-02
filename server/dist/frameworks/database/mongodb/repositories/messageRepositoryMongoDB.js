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
exports.messageRepositoryMongoDB = void 0;
const messageModel_1 = require("../models/messageModel");
const userModel_1 = require("../models/userModel");
class messageRepositoryMongoDB {
    saveMessage(sender, receiver, content, audioUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new messageModel_1.MessageModel({
                sender,
                receiver,
                content,
                audioUrl,
                timestamp: new Date(),
                status: "sent",
            });
            return message.save();
        });
    }
    getMessagesBetweenUsers(user1, user2) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield messageModel_1.MessageModel.find({
                $or: [
                    { sender: user1, receiver: user2 },
                    { sender: user2, receiver: user1 },
                ],
            })
                .sort({ timestamp: 1 })
                .exec();
            return messages;
        });
    }
    getChatUsers(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // Change return type accordingly
            const sentMessages = yield messageModel_1.MessageModel.find({ sender: currentUser })
                .distinct("receiver")
                .exec();
            const receivedMessages = yield messageModel_1.MessageModel.find({
                receiver: currentUser,
            })
                .distinct("sender")
                .exec();
            const uniqueUserIds = Array.from(new Set([...sentMessages, ...receivedMessages]));
            const users = yield userModel_1.UserModel.find({
                _id: { $in: uniqueUserIds },
            }).exec();
            return users;
        });
    }
    currentUserDetails(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", currentUser);
                const user = yield userModel_1.UserModel.findById(currentUser);
                return user;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.messageRepositoryMongoDB = messageRepositoryMongoDB;
