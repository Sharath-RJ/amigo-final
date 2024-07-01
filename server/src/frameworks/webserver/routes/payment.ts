
import express, { Router } from "express"
import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()

export default function paymentRouter(): Router {
    const router = express.Router()
   
    return router
}
