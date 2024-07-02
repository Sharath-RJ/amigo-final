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
const express_1 = __importDefault(require("express"));
const generative_ai_1 = require("@google/generative-ai");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const checkBlockMiddleware_1 = require("../middlewares/checkBlockMiddleware");
const dotenv_1 = __importDefault(require("dotenv"));
const mock_1 = require("../../../app/useCases/mock");
const mockTestController_1 = require("../../../adapters/controllers/mockTestController");
const mockService_1 = require("../../services/mockService");
const mockTestRepositoryMongoDB_1 = require("../../database/mongodb/repositories/mockTestRepositoryMongoDB");
dotenv_1.default.config();
function mockRouter() {
    const router = express_1.default.Router();
    const mockRepositoryinstance = new mockTestRepositoryMongoDB_1.mockTestRepositoryMongoDB();
    const mockserviceinstance = new mockService_1.mockservice(mockRepositoryinstance);
    const mockUseCaseInsstance = new mock_1.mockUseCase(mockRepositoryinstance, mockserviceinstance);
    const mockControllerInstance = new mockTestController_1.mockTestController(mockUseCaseInsstance);
    router.get("/getQuestions", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const genAi = new generative_ai_1.GoogleGenerativeAI(process.env.GENAI_API);
        const model = genAi.getGenerativeModel({ model: "gemini-pro" });
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

`;
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const text = response.text();
        console.log(text);
        res.json(JSON.parse(text));
    }));
    router.post("/submitAnswers", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, mockControllerInstance.submitQuestion.bind(mockControllerInstance));
    return router;
}
exports.default = mockRouter;
