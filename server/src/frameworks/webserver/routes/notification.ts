import express, { Router } from "express";

import authenticate from "../middlewares/authMiddleware";
import { notificationMongoDB } from "../../database/mongodb/repositories/notificationReppositoryMonogDB";
import { notificationUseCase } from "../../../app/useCases/notification";
import { notificationController } from "../../../adapters/controllers/notificationController";

export default function notificationRouter():Router{
   const router = express.Router();
     const notificationRepository = new notificationMongoDB()
     const notifiactionUseCaseINstance = new notificationUseCase(notificationRepository)
     const notificationControllerinstance = new notificationController(notifiactionUseCaseINstance)


     router.post("/sendNotifiction", authenticate, notificationControllerinstance.sendNotification.bind(notificationControllerinstance))
     router.get("/getAllNotifications", authenticate, notificationControllerinstance.getNotifications.bind(notificationControllerinstance))

   

   return router
}