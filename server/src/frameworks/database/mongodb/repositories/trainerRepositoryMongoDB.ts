import { trainerRepository } from "../../../../app/repositories/trainerRepository"
import { AppointmentModel } from "../models/appointments"
import { UserModel } from "../models/userModel"

export interface AvailableSlot {
    dayOfWeek: string
    timeRange: string
}
export class trainerRepositoryMongoDB implements trainerRepository {
    async completeProfile(
        fullName: string,
        bio: string,
        specialization: string,
        experience: number,
        qualifications: string,
        timeZone: string,
        hourlyRate: number,
        AvailableSlots: AvailableSlot[],
        id: string
    ): Promise<any> {
        console.log("user id from mongo", id)
        try {
            return await UserModel.findByIdAndUpdate(
                id,
                {
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
                },
                { new: true }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getDashboard(id: string): Promise<any> {
        try {
            return await UserModel.findById(id)
        } catch (error) {
            console.log(error)
        }
    }


    async getAllTrainers(): Promise<any> {
        try {
            return await UserModel.find({role:"Trainer"})
        } catch (error) {
            console.log(error)
        }
    }

    async getTrainerProfile(id: string): Promise<any> {
        try {
            return await UserModel.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async bookNow(slot: string, trainerId: string, userId: string): Promise<any> {
        try {
            return await AppointmentModel.create({
                trainer: trainerId,
                client: userId,
                slot: slot,
            })
            //booking slot
        //    return await UserModel.updateOne(
        //         { _id: trainerId, "AvailableSlots.timeRange": slot },
        //         { $set: { "AvailableSlots.$.status": "booked" } }
        //     )
        } catch (error) {
            console.log(error)
        }
    }

  async getAllAppointments(id: string): Promise<any> {
    try {
        return await AppointmentModel.find({trainer: id}).populate("client", "username profilePic")
    } catch (error) {
        console.log(error)
    }
}

async updateSlot(status: string, slot: string): Promise<any> {
    try {
        return await UserModel.updateOne(
            { "AvailableSlots._id": slot },
            { $set: { "AvailableSlots.$.status": status } },
            { upsert: true }
        )
    } catch (error) {
        console.log(error)
    }
}
}
