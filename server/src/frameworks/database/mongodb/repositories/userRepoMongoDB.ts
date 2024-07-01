import { UserRepoInterface } from "../../../../app/repositories/userRepoInterface"
import { AppointmentModel } from "../models/appointments"
import { fluencyModel } from "../models/flulency"
import { MockTest } from "../models/mockTest"
import { UserModel } from "../models/userModel"




export class userRepoMongoDB implements UserRepoInterface {
    async getAllUsers(id: string): Promise<any> {
        try {
            const loggedInUserId = id
            const users = await UserModel.find({
                _id: { $ne: loggedInUserId },
            }).lean()
            const usersWithFollowStatus = await Promise.all(
                users.map(async (user) => {
                    // Check if the logged-in user is following this user
                    const isFollowing = await UserModel.exists({
                        _id: loggedInUserId,
                        following: user._id,
                    })
                    console.log(isFollowing)
                    // Add follow status to user object
                    return { ...user, isFollowing: isFollowing }
                })
            )
            console.log(usersWithFollowStatus)
            return usersWithFollowStatus
        } catch (error) {
            console.log(error)
        }
    }

    async followUser(followId: string, userId: string): Promise<any> {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                followId,
                { $push: { followers: userId } },
                { new: true }
            )
            await UserModel.findByIdAndUpdate(
                userId,
                { $push: { following: followId } },
                { new: true }
            )
            return updatedUser
        } catch (error) {
            console.error("Error following user:", error)
            throw error
        }
    }
    async unfollowUser(followId: string, userId: string): Promise<any> {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                followId,
                { $pull: { followers: userId } },
                { new: true }
            )
            await UserModel.findByIdAndUpdate(
                userId,
                { $pull: { following: followId } },
                { new: true }
            )
            return updatedUser
        } catch (error) {
            console.error("Error unfollowing user:", error)
            throw error
        }
    }

    async updateProfilePic(userId: string, profilePic: string): Promise<any> {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $set: { profilePic: profilePic } },
                { new: true }
            )
            return updatedUser
        } catch (error) {
            console.error("Error updating profile pic:", error)
        }
    }

    async goLive(link: String, id: string): Promise<any> {
        try {
            console.log(link, id)
            return await UserModel.findByIdAndUpdate(
                id,
                { $set: { liveLink: link, isLive: true } },
                { new: true }
            )
        } catch (error) {
            console.error("Error updating profile pic:", error)
        }
    }

    async getLiveUsers(): Promise<any> {
        try {
            return await UserModel.find({ isLive: true })
        } catch (error) {
            console.error("Error getting live link:", error)
            throw error
        }
    }

    async stopLive(link: String, id: string): Promise<any> {
        try {
            return await UserModel.findByIdAndUpdate(
                id,
                { $set: { liveLink: link, isLive: false } },
                { new: true }
            )
        } catch (error) {
            console.error("Error getting live link:", error)
            throw error
        }
    }

    async getLoggedInUserDetails(id: string) {
        try {
            return await UserModel.findById(id).populate('following followers')
        } catch (error) {
            console.log(error)
        }
    }

    async loadProgress(id: string): Promise<any> {
        try {
            return await MockTest.find({ user: id })
        } catch (error) {
            console.log(error)
        }
    }

    async loadFluency(id: string) {
        try {
            return await fluencyModel.find({ user: id })
        } catch (error) {
          console.log(error)  
        }
    }

    async getMyAppointments(id:string): Promise<any> {
        try {
            return await AppointmentModel.find({ client: id }).populate(
                "trainer",
                "fullName profilePic specialization MeetLink"
            )
        } catch (error) {
            console.log(error)
        }
    }
}
