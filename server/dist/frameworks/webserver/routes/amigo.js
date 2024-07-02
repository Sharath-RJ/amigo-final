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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const amigoRepositoryMongoDB_1 = require("../../database/mongodb/repositories/amigoRepositoryMongoDB");
const fluencyService_1 = require("../../services/fluencyService");
const amigo_1 = require("../../../app/useCases/amigo");
const amigoController_1 = require("../../../adapters/controllers/amigoController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const checkBlockMiddleware_1 = require("../middlewares/checkBlockMiddleware");
dotenv_1.default.config();
function amigoRouter() {
    const router = express_1.default.Router();
    const amigoRepoInstance = new amigoRepositoryMongoDB_1.amigoRepositoryMongoDB();
    const amigoServiceInstance = new fluencyService_1.fluencyService();
    const aimigoUseCaseInsstance = new amigo_1.amigoUsecase(amigoRepoInstance, amigoServiceInstance);
    const amigoControllerInstance = new amigoController_1.amigoController(aimigoUseCaseInsstance);
    router.post("/analyze-text", (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log("Analysing text");
        const { question } = req.body;
        console.log(question);
        const genAi = new generative_ai_1.GoogleGenerativeAI(process.env.GENAI_API);
        const model = genAi.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `
As an individual who is fluent in English, your task is to respond to the following question in a friendly manner and engage in an interactive conversation. The question you will respond to is: "${question}". Begin by crafting a welcoming and engaging response to the query, and remember to ask a follow-up question to keep the conversation flowing smoothly. This exercise is designed to help improve English speaking skills through interactive dialogue. Show empathy, maintain a friendly tone, and encourage further communication by showing interest in the topic at hand. Remember to adapt your responses based on the context of the question and build rapport with the other party through meaningful conversation.
    

`;
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const text = response.text();
        console.log(text);
        res.json({ answer: text });
    }));
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
    router.post("/checkFluency", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, amigoControllerInstance.fluencyAnalysis.bind(amigoControllerInstance));
    return router;
}
exports.default = amigoRouter;
