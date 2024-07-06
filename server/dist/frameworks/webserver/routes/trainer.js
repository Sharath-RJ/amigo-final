"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainer_1 = require("../../../app/useCases/trainer");
const trainerController_1 = require("../../../adapters/controllers/trainerController");
const trainerRepositoryMongoDB_1 = require("../../database/mongodb/repositories/trainerRepositoryMongoDB");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
function trainerRouter() {
    const router = express_1.default.Router();
    const trainerRepository = new trainerRepositoryMongoDB_1.trainerRepositoryMongoDB();
    const trainerUseCaseInstance = new trainer_1.trainerUseCase(trainerRepository);
    const trainerController = new trainerController_1.TrainerController(trainerUseCaseInstance);
    router.post("/completeProfile", authMiddleware_1.default, trainerController.completeProfile.bind(trainerController));
    router.get("/Dashboard", authMiddleware_1.default, trainerController.getDashboard.bind(trainerController));
    router.get("/getAllTrainers", trainerController.getAllTrainers.bind(trainerController));
    router.get("/getTrainerProfile/:id", trainerController.getTrainerProfile.bind(trainerController));
    router.post("/bookNow", authMiddleware_1.default, trainerController.bookNow.bind(trainerController));
    router.get("/getAllAppointments", authMiddleware_1.default, trainerController.getAllAppointments.bind(trainerController));
    router.patch("/updateSlot/:slot", authMiddleware_1.default, trainerController.updateSlot.bind(trainerController));
    router.get("/CheckSlotBooked/:slot", trainerController.checkSlotBooked.bind(trainerController));
    return router;
}
exports.default = trainerRouter;
