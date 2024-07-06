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
exports.trainerUseCase = void 0;
class trainerUseCase {
    constructor(_trainerRepository) {
        this._trainerRepository = _trainerRepository;
    }
    completeProfile(fullName, bio, specialization, experience, qualifications, timeZone, hourlyRate, AvailableSlots, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._trainerRepository.completeProfile(fullName, bio, specialization, experience, qualifications, timeZone, hourlyRate, AvailableSlots, id);
        });
    }
    getDashboard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._trainerRepository.getDashboard(id);
        });
    }
    getAllTrainers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._trainerRepository.getAllTrainers();
        });
    }
    getTrainerProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("trainer id", id);
            return yield this._trainerRepository.getTrainerProfile(id);
        });
    }
    bookNow(slot, trainerId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._trainerRepository.bookNow(slot, trainerId, userId);
        });
    }
    getAllAppointments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._trainerRepository.getAllAppointments(id);
        });
    }
    updateSlot(status, slot) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._trainerRepository.updateSlot(status, slot);
        });
    }
    checkSlotBooked(slot) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._trainerRepository.checkSlotBooked(slot);
        });
    }
}
exports.trainerUseCase = trainerUseCase;
