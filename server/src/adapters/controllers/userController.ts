import { Request, Response } from "express"
import { User } from "../../entities/user"
import { userUseCase } from "../../app/useCases/user"
interface customRequest extends Request {
    user?: any
}
export class userConteoller {
    static getAllUsers: any

    constructor(private _userUseCase: userUseCase) {}
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this._userUseCase.getUsers(req.params.userId)
            console.log(users)
            if (users) {
                console.log(users)
                res.status(200).json(users)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async followUser(req: Request, res: Response): Promise<void> {
        try {
            const { followId, userId } = req.params
            const user = await this._userUseCase.followUser(followId, userId)
            console.log(user)
            if (user) {
                res.status(200).json(user)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async unfollowUser(req: Request, res: Response): Promise<void> {
        try {
            const { followId, userId } = req.params
            const user = await this._userUseCase.unfollowUser(followId, userId)
            if (user) {
                res.status(200).json(user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateProfilePic(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params
            const { profilePic } = req.body
            const user = await this._userUseCase.updateProfilePic(
                userId,
                profilePic
            )
            if (user) {
                res.status(200).json(user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async goLive(req: customRequest, res: Response): Promise<void> {
        try {
            const { livelink } = req.body

            const user = await this._userUseCase.goLive(livelink, req.user._id)
            if (user) {
                res.status(200).json(user)
            }
        } catch (error) {
            console.log(error)
        }
    }

   async getLiveUsers(req: Request, res: Response): Promise<any> {
        try {
            const users = await this._userUseCase.getLiveUsers()
            if (users) {
                res.status(200).json(users)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async stopLive(req: customRequest, res: Response): Promise<void> {
        try {
            
            const { livelink } = req.body
            const user = await this._userUseCase.stopLive(
                livelink,
                req.user._id
            )
            if (user) {
                res.status(200).json(user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getLoggedInUserDetails(req:customRequest, res: Response): Promise<void> {
        try {
            const userDetails = await this._userUseCase.getLoggedInUserDetails(req.user._id) 
            console.log("ooooooooooooooooooooooooo",userDetails)
            if(userDetails) {
                res.status(200).json(userDetails)
            }
        } catch (error) {
            console.log(error)
        }
       
    }

    async loadProgress(req: customRequest, res: Response): Promise<void> {
        try {
            const progress = await this._userUseCase.loadProgress(req.user?._id)
            if (progress) {
                res.status(200).json(progress)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async loadFluency(req: customRequest, res: Response): Promise<void> {
        try {
            const fluency = await this._userUseCase.loadFluency(req.user?._id)
            if (fluency) {
                res.status(200).json(fluency)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getMyAppointments(req: customRequest, res: Response): Promise<void> {
        try {
            const appointments = await this._userUseCase.getMyAppointments( req.user?._id)
            console.log(appointments)
            if (appointments) {
                res.status(200).json(appointments)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
