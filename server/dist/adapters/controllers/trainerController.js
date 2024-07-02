"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerController = void 0;
class TrainerController {
    constructor(_trainerUseCase) {
        this._trainerUseCase = _trainerUseCase;
    }
    completeProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { fullName, bio, specialization, experience, qualifications, timeZone, hourlyRate, AvailableSlots } = req.body;
                console.log("id from authenticated user", (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                const profileCompleted = yield this._trainerUseCase.completeProfile(fullName, bio, specialization, experience, qualifications, timeZone, hourlyRate, AvailableSlots, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
                console.log("completed profile", profileCompleted);
                if (profileCompleted) {
                    res.status(200).json(profileCompleted);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const dashboard = yield this._trainerUseCase.getDashboard((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                console.log(dashboard);
                if (dashboard) {
                    res.status(200).json(dashboard);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllTrainers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trainers = yield this._trainerUseCase.getAllTrainers();
                console.log(trainers);
                if (trainers) {
                    res.status(200).json(trainers);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getTrainerProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const trainerProfile = yield this._trainerUseCase.getTrainerProfile(id);
                console.log(trainerProfile);
                if (trainerProfile) {
                    res.status(200).json(trainerProfile);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    bookNow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { slot, trainerId } = req.body;
                const booked = yield this._trainerUseCase.bookNow(slot, trainerId, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", booked);
                if (booked)
                    res.status(200).json(booked);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const appointments = yield this._trainerUseCase.getAllAppointments((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
                console.log(appointments);
                if (appointments) {
                    res.status(200).json(appointments);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateSlot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                const { slot } = req.params;
                console.log(status);
                console.log(slot);
                const slotUpdated = yield this._trainerUseCase.updateSlot(status, slot);
                if (slotUpdated) {
                    res.status(200).json(slotUpdated);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.TrainerController = TrainerController;
