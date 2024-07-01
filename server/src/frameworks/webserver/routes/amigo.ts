import { GoogleGenerativeAI } from "@google/generative-ai";
import express, { Router, raw } from "express";
import dotenv from "dotenv"
import { amigoRepositoryMongoDB } from "../../database/mongodb/repositories/amigoRepositoryMongoDB";
import { fluencyService } from "../../services/fluencyService";
import { amigoUsecase } from "../../../app/useCases/amigo";
import { amigoController } from "../../../adapters/controllers/amigoController";
import authenticate from "../middlewares/authMiddleware";
import { isBlocked } from "../middlewares/checkBlockMiddleware";
dotenv.config()

export default function amigoRouter(): Router {
    const router = express.Router();

    const amigoRepoInstance = new amigoRepositoryMongoDB();
    const amigoServiceInstance = new fluencyService();
   const aimigoUseCaseInsstance = new amigoUsecase(amigoRepoInstance, amigoServiceInstance);
    const amigoControllerInstance = new amigoController(aimigoUseCaseInsstance)


    router.post("/analyze-text", async(req, res) => {
        console.log("Analysing text")
          const { question } = req.body
          console.log(question)
        
          const genAi = new GoogleGenerativeAI(process.env.GENAI_API as string)
          const model = genAi.getGenerativeModel({ model: "gemini-pro" })
          const prompt = `
As an individual who is fluent in English, your task is to respond to the following question in a friendly manner and engage in an interactive conversation. The question you will respond to is: "${question}". Begin by crafting a welcoming and engaging response to the query, and remember to ask a follow-up question to keep the conversation flowing smoothly. This exercise is designed to help improve English speaking skills through interactive dialogue. Show empathy, maintain a friendly tone, and encourage further communication by showing interest in the topic at hand. Remember to adapt your responses based on the context of the question and build rapport with the other party through meaningful conversation.
    

`

          const result = await model.generateContent(prompt)
          const response = await result.response
          const text = response.text()
          console.log(text)
          
          res.json({ answer: text })

    })

//     router.post("/checkFluency", async(req, res) =>{
//       try {
//         const {voice}= req.body
//         console.log("vvvvvvvvvvvvvvvvvvvvvvv",voice)
//         const genAi = new GoogleGenerativeAI(process.env.GENAI_API as string)
//         const model = genAi.getGenerativeModel({ model: "gemini-pro" })
//         const prompt = JSON.stringify(`Please analyze the following text:${voice} for English fluency and provide feedback:
//   1. Evaluate if the text uses proper English sentence structures.
//   2. Check for filler words and repetitive words that may reduce fluency.
//   3. Provide a fluency score out of 10, where 10 indicates perfect fluency.
//   4. Offer feedback on how the text could be improved to enhance its fluency.
  
//   Generate the result in the following JSON format:
// {
//   "text": "Insert the original text here.",
//   "analysis": {
//     "english_sentence_structures": "Provide feedback on sentence structures.",
//     "filler_and_repetitive_words": "Comment on filler words and repetitions.",
//     "fluency_score": "Fluency score out of 10 with an explanation.",
//     "feedback_for_improvement": [
//       "Suggestions for improvement 1.",
//       "Suggestions for improvement 2.",
//       "Suggestions for improvement 3."
//     ]
//   }
// }`);

//          const result = await model.generateContent(prompt)
//          const response = await result.response
//          const text = response.text()
//          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",text)
//          const jsonData = JSON.parse(text)
         
//          res.json(jsonData)

//       } catch (error) {
//         console.log(error)
//       }
//     })

   router.post("/checkFluency", authenticate, isBlocked,amigoControllerInstance.fluencyAnalysis.bind(amigoControllerInstance) )

  return router
}