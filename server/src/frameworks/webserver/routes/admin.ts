import express, { Router } from "express"
import { adminRepositoryMongoDB } from "../../database/mongodb/repositories/adminRepositoryMongoDB"
import { adminUseCase } from "../../../app/useCases/admin"
import { adminController } from "../../../adapters/controllers/adminController"

export default function adminRouter(){
    const router = express.Router()
    const adminRepository = new adminRepositoryMongoDB()
    const adminUseCaseInstance = new adminUseCase(adminRepository)
    const adminControllerInstance = new adminController(adminUseCaseInstance)

    router.get(
        "/getAllUsers",
        adminControllerInstance.getAllUsers.bind(adminControllerInstance)
    )
    router.put(
        "/blockUser/:id",
        adminControllerInstance.blockUser.bind(adminControllerInstance)
    )
    router.put(
        "/unblockUser/:id",
        adminControllerInstance.unblockUser.bind(adminControllerInstance)
    )
    router.patch(
        "/publish/:id",
        adminControllerInstance.publishPost.bind(adminControllerInstance)
    )
    router.get(
        "/viewPost/:id",
        adminControllerInstance.getPostDetails.bind(adminControllerInstance)
    )

    router.get("/getPosts",
                adminControllerInstance.getPosts.bind(adminControllerInstance)
   )

   router.patch("/updateUser/:id", adminControllerInstance.updateUser.bind(adminControllerInstance))

    return router
}
