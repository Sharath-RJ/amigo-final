import { promises } from "dns";
import { UserRepoInterface } from "../repositories/userRepoInterface";


export class userUseCase {
    constructor(private _userRepoInterface: UserRepoInterface) {}

    async getUsers(id: string) {
        return await this._userRepoInterface.getAllUsers(id)
    }

    async followUser(followId: string, userId: string) {
        return await this._userRepoInterface.followUser(followId, userId)
    }

    async unfollowUser(followId: string, userId: string) {
        return await this._userRepoInterface.unfollowUser(followId, userId)
    }
    async updateProfilePic(userId: string, profilePic: string) {
        return await this._userRepoInterface.updateProfilePic(
            userId,
            profilePic
        )
    }

    async goLive(link: String, id: string) {
        return await this._userRepoInterface.goLive(link, id)
    }

    async getLiveUsers() {
        return await this._userRepoInterface.getLiveUsers()
    }

    async stopLive(livelink: String, id: string) {
        return await this._userRepoInterface.stopLive(livelink, id)
    }

    async getLoggedInUserDetails(id: string) {
        return await this._userRepoInterface.getLoggedInUserDetails(id)
    }
    async loadProgress(id: string) {
        return await this._userRepoInterface.loadProgress(id)
    }

    async loadFluency(id: string) {
        return await this._userRepoInterface.loadFluency(id)
    }

   

    async getMyAppointments(id: string) {
        return await this._userRepoInterface.getMyAppointments(id)
    }
}