import { Console } from "console";
import {  trainerUseCase } from "../../app/useCases/trainer";
import { Request, Response } from "express";
interface customRequest extends Request {
    user?: any
}
export class TrainerController {
  constructor(private _trainerUseCase: trainerUseCase) {}


 async completeProfile(req:customRequest, res:Response): Promise<void> {
       try {
         const {fullName, bio, specialization, experience, qualifications, timeZone, hourlyRate, AvailableSlots}= req.body
         console.log("id from authenticated user", req.user?._id)
         const profileCompleted= await this._trainerUseCase.completeProfile(fullName, bio, specialization, experience, qualifications, timeZone, hourlyRate,AvailableSlots, req.user?._id)
         console.log("completed profile",profileCompleted)
         if(profileCompleted) {
            res.status(200).json(profileCompleted)
         }

       } catch (error) {
          console.log(error)
       }
  }

  async getDashboard(req:customRequest, res:Response):Promise<any> {
    try {
      const dashboard = await this._trainerUseCase.getDashboard(req.user?._id)
        console.log(dashboard)
      if(dashboard){
        res.status(200).json(dashboard)
      }
    

    } catch (error) {
      console.log(error)
    }
  }

  async getAllTrainers(req:customRequest, res:Response):Promise<any> {
    try {
      const trainers = await this._trainerUseCase.getAllTrainers()
    
        console.log(trainers)
      if(trainers){
        res.status(200).json(trainers)
      }
    
    }catch (error) {
      console.log(error)
    }
  }


  async getTrainerProfile(req:customRequest, res:Response):Promise<any> {
    try {
      const {id}= req.params
      const trainerProfile = await this._trainerUseCase.getTrainerProfile(id)
        console.log(trainerProfile)
        if(trainerProfile){
          res.status(200).json(trainerProfile)
        }
    } catch (error) {
      console.log(error)
    }
  }

  async bookNow(req:customRequest, res:Response):Promise<any> {
     try {
       const {slot, trainerId}=  req.body
       const booked= await this._trainerUseCase.bookNow(slot, trainerId, req.user?._id)
       console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",booked)
       if(booked)
          res.status(200).json(booked)
     } catch (error) {
        console.log(error)
     }
  }

  async getAllAppointments(req:customRequest, res:Response):Promise<any> {
    try {
      const appointments = await this._trainerUseCase.getAllAppointments(req.user?._id)
        console.log(appointments)
        if(appointments){
          res.status(200).json(appointments)
        }
    } catch (error) {
      console.log(error)
    }
  }

  async updateSlot(req:customRequest, res:Response):Promise<any> {
    try {
      const{status}= req.body
      const{slot}=req.params
      console.log(status)
      console.log(slot)
      const slotUpdated=await this._trainerUseCase.updateSlot(status,slot)
      if(slotUpdated){
        res.status(200).json(slotUpdated)
      }
    } catch (error) {
      console.log(error)
    }
  }
}