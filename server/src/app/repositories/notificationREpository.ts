export interface notificationRepository{
    sendNotification: (message:string ,receiverId:string, id:string) => Promise<any>
    getNotifications:(id:string) => Promise<any>
}