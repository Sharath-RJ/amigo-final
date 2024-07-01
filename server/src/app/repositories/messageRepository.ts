import {IMessage} from "../../frameworks/database/mongodb/models/messageModel"

export interface messageRepository {
 saveMessage(sender:string,receiver:string,content?:string, audioUrl?:string): Promise<IMessage>; 
 getMessagesBetweenUsers(user1: string, user2: string): Promise<IMessage[]>
 getChatUsers(currentUser: string): Promise<string[]> 
 currentUserDetails(currentUser: string): Promise<any>
}
