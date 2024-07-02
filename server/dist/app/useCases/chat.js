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
exports.chatUseCase = void 0;
class chatUseCase {
    constructor(_messageRepository) {
        this._messageRepository = _messageRepository;
    }
    sendMessage(sender, receiver, content, audioUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._messageRepository.saveMessage(sender, receiver, content, audioUrl);
        });
    }
    getChatHistory(user1, user2) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._messageRepository.getMessagesBetweenUsers(user1, user2);
        });
    }
    getChatUsers(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._messageRepository.getChatUsers(currentUser);
        });
    }
    currentUserDetails(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Current user", currentUser);
            return this._messageRepository.currentUserDetails(currentUser);
        });
    }
}
exports.chatUseCase = chatUseCase;
