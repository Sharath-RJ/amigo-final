import { mockRepository } from "../repositories/mockTestRepository"
import { notificationRepository } from "../repositories/notificationREpository"
import { MockServiceInterface } from "../services/mockServiceInterface"

export class notificationUseCase {
    constructor(private _notificatoionRepository: notificationRepository) {}

   sendNotification(message: string,receiverId:string, id: string) {  
        return this._notificatoionRepository.sendNotification(message, id, receiverId)
    }

    getNotifications(id: string) {  
        return this._notificatoionRepository.getNotifications(id)
    }
}