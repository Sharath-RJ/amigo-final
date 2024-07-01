import { notificationRepository } from "../../../../app/repositories/notificationREpository";
import { NotificationModel } from "../models/notificationModel";

export class notificationMongoDB implements notificationRepository
{
    async sendNotification(message: string,receiverId:string, id:string): Promise<any> {
        try {
            return await NotificationModel.create({message, recipient: receiverId, sender: id})
        } catch (error) {
           console.log(error) 
        }
    }
    async getNotifications(id: string): Promise<any> {
        try {
            return await NotificationModel.find({recipient: id}).populate("sender", "username profilePic")
        } catch (error) {
            console.log(error)
        }
    }
}