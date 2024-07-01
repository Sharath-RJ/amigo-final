import { StepInstance } from "twilio/lib/rest/studio/v1/flow/engagement/step"
import { User } from "../../entities/user"


export interface UserRepoInterface {
    getAllUsers(id: string): Promise<any>
    followUser(followId: string, userId: string): Promise<any>
    unfollowUser(followId: string, userId: string): Promise<any>
    updateProfilePic(userId: string, profilePic: string): Promise<any>
    goLive(link: String, id: string): Promise<any>
    getLiveUsers(): Promise<any>
    stopLive(link: String, id: string): Promise<any>
    getLoggedInUserDetails(id: string): Promise<any>
    loadProgress(id: string): Promise<any>
    loadFluency(id: string): Promise<any>
    getMyAppointments(id: string): Promise<any>
}