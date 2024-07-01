import express, { Router } from "express";
import { trainerUseCase } from "../../../app/useCases/trainer";
import { TrainerController } from "../../../adapters/controllers/trainerController";
import { trainerRepositoryMongoDB } from "../../database/mongodb/repositories/trainerRepositoryMongoDB";
import authenticate from "../middlewares/authMiddleware";

export default function trainerRouter():Router{
   const router = express.Router();
     const trainerRepository = new trainerRepositoryMongoDB()
     const trainerUseCaseInstance = new trainerUseCase(trainerRepository)
     const trainerController = new TrainerController(trainerUseCaseInstance)

   router.post("/completeProfile", authenticate, trainerController.completeProfile.bind(trainerController));
   router.get("/Dashboard", authenticate, trainerController.getDashboard.bind(trainerController));
   router.get("/getAllTrainers", trainerController.getAllTrainers.bind(trainerController));
   router.get("/getTrainerProfile/:id", trainerController.getTrainerProfile.bind(trainerController));
   router.post("/bookNow", authenticate, trainerController.bookNow.bind(trainerController));
   router.get("/getAllAppointments",authenticate, trainerController.getAllAppointments.bind(trainerController));
   router.patch("/updateSlot/:slot", authenticate, trainerController.updateSlot.bind(trainerController));

   return router
}