import { messageRepository } from "../../../../app/repositories/messageRepository";
import { IMessage, MessageModel } from "../models/messageModel";
import { UserModel } from "../models/userModel";

export class messageRepositoryMongoDB implements messageRepository {
    async saveMessage(
        sender: string,
        receiver: string,
        content: string,
        audioUrl?: string
    ): Promise<IMessage> {
        const message: IMessage = new MessageModel({
            sender,
            receiver,
            content,
            audioUrl,
            timestamp: new Date(),
            status: "sent",
        })
        return message.save()
    }
    async getMessagesBetweenUsers(
        user1: string,
        user2: string
    ): Promise<IMessage[]> {
        const messages = await MessageModel.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 },
            ],
        })
            .sort({ timestamp: 1 })
            .exec()

        return messages as IMessage[]
    }

    async getChatUsers(currentUser: string): Promise<any[]> {
        // Change return type accordingly
        const sentMessages = await MessageModel.find({ sender: currentUser })
            .distinct("receiver")
            .exec()
        const receivedMessages = await MessageModel.find({
            receiver: currentUser,
        })
            .distinct("sender")
            .exec()

        const uniqueUserIds = Array.from(
            new Set([...sentMessages, ...receivedMessages])
        )

        const users = await UserModel.find({
            _id: { $in: uniqueUserIds },
        }).exec()
        return users
    }

   async currentUserDetails(currentUser: string): Promise<any> {
    try {
        console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",currentUser)
       const user = await UserModel.findById(currentUser)
       return user 
    } catch (error) {
        console.log(error)
    }
      
    
   }
}