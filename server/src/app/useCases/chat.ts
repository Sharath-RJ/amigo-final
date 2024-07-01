import { channel } from "diagnostics_channel";
import { IMessage } from "../../frameworks/database/mongodb/models/messageModel";
import { messageRepository } from "../repositories/messageRepository";

export class chatUseCase {
    constructor(private _messageRepository: messageRepository) {}

    async sendMessage(
        sender: string,
        receiver: string,
        content: string,
        audioUrl: string
    ): Promise<IMessage> {
        return await this._messageRepository.saveMessage(
            sender,
            receiver,
            content,
            audioUrl
        )
    }

    async getChatHistory(user1: string, user2: string): Promise<IMessage[]> {
        return this._messageRepository.getMessagesBetweenUsers(user1, user2)
    }

    async getChatUsers(currentUser: string): Promise<string[]> {
        return this._messageRepository.getChatUsers(currentUser)
    }

    async currentUserDetails(currentUser: string): Promise<any> {
        console.log("Current user", currentUser)
        return this._messageRepository.currentUserDetails(currentUser)
    }
}