import express, { Router } from "express"
import openai from "openai"
import { GoogleGenerativeAI } from "@google/generative-ai"
import test from "node:test"
import authenticate from "../middlewares/authMiddleware"
import { isBlocked } from "../middlewares/checkBlockMiddleware"
import dotenv from "dotenv"
import { mockUseCase } from "../../../app/useCases/mock"
import { mockTestController } from "../../../adapters/controllers/mockTestController"
import { mockservice } from "../../services/mockService"
import { mockTestRepositoryMongoDB } from "../../database/mongodb/repositories/mockTestRepositoryMongoDB"
dotenv.config()

export default function mockRouter(): Router {
    const router = express.Router()
   const mockRepositoryinstance = new mockTestRepositoryMongoDB();
    const mockserviceinstance = new mockservice(mockRepositoryinstance);
   const mockUseCaseInsstance = new mockUseCase(mockRepositoryinstance, mockserviceinstance);
    const mockControllerInstance = new mockTestController(mockUseCaseInsstance);




    router.get("/getQuestions", authenticate, isBlocked, async (req, res) => {
        const genAi = new GoogleGenerativeAI(process.env.GENAI_API as string)
        const model = genAi.getGenerativeModel({ model: "gemini-pro" })
        const prompt = `Create a mock test consisting of 15 questions and 4 options for each question, for assessing English language and grammar proficiency. Each question should have a question number, a question, four answer options, and the correct answer. The questions should start very easy and gradually increase in difficulty: the first 5 questions should be at a beginner level, the next 5 questions at an intermediate level, and the final 5 questions at an advanced level. Use the following format for each question note that it should be a valid JSON should not contain any special characters and unwantes strings at the begining and even the end of the following array. :

[
  {
    "question_number": 1,
    "question": "",
    "options": ["", "", "", ""],
    "correct_answer": ""
  },
  {
    "question_number": 2,
    "question": "",
    "options": ["", "", "", ""],
    "correct_answer": ""
  },
  ...
  {
    "question_number": 15,
    "question": "",
    "options": ["", "", "", ""],
    "correct_answer": ""
  }
]

`
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        console.log(text)
        res.json(JSON.parse(text))
    })

    router.post("/submitAnswers", authenticate, isBlocked,mockControllerInstance.submitQuestion.bind(mockControllerInstance) )
    return router
}
