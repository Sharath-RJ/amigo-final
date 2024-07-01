import AuthRouter from "./userAuth"

import { Application } from "express"
import ChatRouter from "./chat"
import userRoute from "./user"
import adminRouter from "./admin"
import PostsRouter from "./posts"
import mockRouter from "./mock"
import uploadAudio from "../middlewares/audioMiddleware"
import amigoRouter from "./amigo"
import trainerRouter from "./trainer"
import notificationRouter from "./notification"
import paymentRouter from "./payment"


const routes = (app: Application) => {

    app.use("/api/user-auth", AuthRouter())
    app.use("/api/post",PostsRouter())
    app.use("/api/chat",ChatRouter())
    app.use("/api/user", userRoute())
    app.use("/api/admin", adminRouter())
    app.use("/api/mock", mockRouter())
    app.use("/api/amigo", amigoRouter())
    app.use("/api/trainer", trainerRouter())
    app.use("/api/notification", notificationRouter())
    app.use("/api/payment", paymentRouter())

    
}

export default routes
