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
exports.trainerRepositoryMongoDB = void 0;
const appointments_1 = require("../models/appointments");
const userModel_1 = require("../models/userModel");
class trainerRepositoryMongoDB {
    completeProfile(fullName, bio, specialization, experience, qualifications, timeZone, hourlyRate, AvailableSlots, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("user id from mongo", id);
            try {
                return yield userModel_1.UserModel.findByIdAndUpdate(id, {
                    $set: {
                        fullName,
                        bio,
                        specialization,
                        experience,
                        qualifications,
                        timeZone,
                        hourlyRate,
                        AvailableSlots,
                        profileComplete: true,
                    },
                }, { new: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getDashboard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllTrainers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.find({ role: "Trainer" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getTrainerProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    bookNow(slot, trainerId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointments_1.AppointmentModel.create({
                    trainer: trainerId,
                    client: userId,
                    slot: slot,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllAppointments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield appointments_1.AppointmentModel.find({ trainer: id }).populate("client", "username profilePic");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateSlot(status, slot) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.updateOne({ "AvailableSlots._id": slot }, { $set: { "AvailableSlots.$.status": status } }, { upsert: true });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    checkSlotBooked(slot) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.findOne({ "AvailableSlots._id": slot });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.trainerRepositoryMongoDB = trainerRepositoryMongoDB;
