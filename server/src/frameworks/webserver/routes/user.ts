import express, { Router } from "express"
import { userConteoller } from "../../../adapters/controllers/userController"
import { userRepoMongoDB } from "../../database/mongodb/repositories/userRepoMongoDB"
import { userUseCase } from "../../../app/useCases/user"
import authenticate from "../middlewares/authMiddleware"
import { isBlocked } from "../middlewares/checkBlockMiddleware"


export default function userRoute(): Router {
    const router = express.Router()
    const userRepository = new userRepoMongoDB()
    const userUseCaseInstance = new userUseCase(userRepository)
    const userControllerInstance = new userConteoller(userUseCaseInstance)

    router.get(
        "/getAllUsers/:userId",
        authenticate,
        isBlocked,
        userControllerInstance.getAllUsers.bind(userControllerInstance)
    )

           
    router.put(
        "/follow/:followId/:userId",
        authenticate,
        isBlocked,
        userControllerInstance.followUser.bind(userControllerInstance)
    )
    router.put(
        "/unfollow/:followId/:userId",
        authenticate,
        isBlocked,
        userControllerInstance.unfollowUser.bind(userControllerInstance)
    )
    router.put(
        "/updateProfilePic/:userId",
        authenticate,
        isBlocked,
        userControllerInstance.updateProfilePic.bind(userControllerInstance)
    )
    router.put(
        "/goLive",
        authenticate,
        isBlocked,
        userControllerInstance.goLive.bind(userControllerInstance)
    )
    router.get(
        "/getLiveUsers",
        authenticate,
        isBlocked,
        userControllerInstance.getLiveUsers.bind(userControllerInstance)
    )
    router.put(
        "/stopLive",
        authenticate,
        isBlocked,
        userControllerInstance.stopLive.bind(userControllerInstance)
    )

    router.get(
        "/getLoggedInUserDetails",
        authenticate,
        isBlocked,
        userControllerInstance.getLoggedInUserDetails.bind(
            userControllerInstance
        )
    )

    router.get("/loadProgress", authenticate, userControllerInstance.loadProgress.bind(userControllerInstance))
    router.get("/loadFluency", authenticate, userControllerInstance.loadFluency.bind(userControllerInstance))
    router.get("/getMyAppointments", authenticate, userControllerInstance.getMyAppointments.bind(userControllerInstance))

    return router
}
