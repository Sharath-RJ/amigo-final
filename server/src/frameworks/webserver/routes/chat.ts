import express, { Router } from "express"
import { chatController as ChatControllerClass } from "../../../adapters/controllers/chatController"
import { messageRepositoryMongoDB } from "../../database/mongodb/repositories/messageRepositoryMongoDB"
import { chatUseCase } from "../../../app/useCases/chat"
import { io } from "../../../app" // Adjust the path accordingly
import { GoogleGenerativeAI } from "@google/generative-ai"
import uploadAudio from "../middlewares/audioMiddleware"
import authenticate from "../middlewares/authMiddleware"
import { isBlocked } from "../middlewares/checkBlockMiddleware"
import * as speech from "@google-cloud/speech"
const { protos } = require("@google-cloud/speech")
import { connect } from "http2"
import Content from "twilio/lib/rest/Content"
import axios from "axios"
import { promisify } from "util"
import fs from "fs"
import ffmpeg from "fluent-ffmpeg"
import dotenv from "dotenv"
dotenv.config()


export default function ChatRouter(): Router {
    const router = express.Router()
    const chatRepository = new messageRepositoryMongoDB()
    const chatUseCaseInstance = new chatUseCase(chatRepository)
    const chatControllerInstance = new ChatControllerClass(
        chatUseCaseInstance,
        io
    ) // Pass io instance

    router.post(
        "/send",
        authenticate,
        isBlocked,
        chatControllerInstance.sendMessage.bind(chatControllerInstance)
    )
    router.get(
        "/getAllMessages/:senderId/:receiverId",
        authenticate,
        isBlocked,
        chatControllerInstance.getChatHistory.bind(chatControllerInstance)
    )
    router.get(
        "/getChatUsers/:id",
        authenticate,
        isBlocked,
        chatControllerInstance.getChatUsers.bind(chatControllerInstance)
    )
    router.post("/checkGrammar", authenticate, isBlocked, async (req, res) => {
        const { content } = req.body
        console.log("checking grammer")

        const genAi = new GoogleGenerativeAI(process.env.GENAI_API as string)
        const model = genAi.getGenerativeModel({ model: "gemini-pro" })
        const prompt = `You are a perfect English teacher. Your task is to correct the grammar and spelling mistakes in the following sentence:${content}. 
       The sentence is meant to be sent to a friend via a chat app. Please provide the corrected version of the sentence.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        console.log(text)
        res.json(text)
    })


     router.post(
         "/Audioupload",
         authenticate,
         isBlocked,
         uploadAudio.single("audio"),
         (req, res) => {
             console.log("Inside audio URL logic")
             const file = req.file
             if (!file) {
                 return res.status(400).send("No file uploaded.")
             }
             // Cloudinary URL
             const fileUrl = file.path
             res.json({ fileUrl: fileUrl })
         }
     )

     router.get(
         "/currentUserDetails/:id",
         authenticate,
         isBlocked,
         chatControllerInstance.currentUserDetails.bind(chatControllerInstance)
     )






    return router
}
