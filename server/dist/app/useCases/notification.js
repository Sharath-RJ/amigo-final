"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationUseCase = void 0;
class notificationUseCase {
    constructor(_notificatoionRepository) {
        this._notificatoionRepository = _notificatoionRepository;
    }
    sendNotification(message, receiverId, id) {
        return this._notificatoionRepository.sendNotification(message, id, receiverId);
    }
    getNotifications(id) {
        return this._notificatoionRepository.getNotifications(id);
    }
    getNotificationCount(id) {
        return this._notificatoionRepository.getNotificationCount(id);
    }
}
exports.notificationUseCase = notificationUseCase;
