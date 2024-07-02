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
exports.chatController = void 0;
class chatController {
    constructor(_chatUseCase, io) {
        this._chatUseCase = _chatUseCase;
        this.io = io;
        this.getChatUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.params.id;
                const users = yield this._chatUseCase.getChatUsers(currentUser);
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({
                    message: "An error occurred while fetching chat users",
                    error,
                });
            }
        });
    }
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sender, receiver, content, audioUrl } = req.body;
            try {
                const message = yield this._chatUseCase.sendMessage(sender, receiver, content, audioUrl);
                this.io.to(receiver).emit("newMessage", message); // Emit message to receiver
                res.json(message);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An error occurred" });
            }
        });
    }
    getChatHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, receiverId } = req.params;
            try {
                const messages = yield this._chatUseCase.getChatHistory(senderId, receiverId);
                res.json(messages);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An error occurred" });
            }
        });
    }
    currentUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.params.id;
                console.log("Receiver id", currentUser);
                const currentUserDetails = yield this._chatUseCase.currentUserDetails(currentUser);
                console.log("Current user details", currentUserDetails);
                if (currentUserDetails)
                    res.status(200).json(currentUserDetails);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.chatController = chatController;
