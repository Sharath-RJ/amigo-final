import mongoose, { Document, Schema } from "mongoose";

export interface AppointmentDocument extends Document {
    trainer: mongoose.Types.ObjectId
    client: mongoose.Types.ObjectId
    slot: { dayOfWeek: string; timeRange: string }
    createdAt: Date
}

const  Appointment = new Schema({
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slot: {
        dayOfWeek: { type: String, required: true },
        timeRange: { type: String, required: true }
    },
    status: { type: String, default: 'booked' },
    createdAt: { type: Date, default: Date.now }
});

export const AppointmentModel = mongoose.model<AppointmentDocument>("Appointment", Appointment)
