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
const chatController_1 = require("../../../adapters/controllers/chatController");
const messageRepositoryMongoDB_1 = require("../../database/mongodb/repositories/messageRepositoryMongoDB");
const chat_1 = require("../../../app/useCases/chat");
const app_1 = require("../../../app"); // Adjust the path accordingly
const generative_ai_1 = require("@google/generative-ai");
const audioMiddleware_1 = __importDefault(require("../middlewares/audioMiddleware"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const checkBlockMiddleware_1 = require("../middlewares/checkBlockMiddleware");
const { protos } = require("@google-cloud/speech");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function ChatRouter() {
    const router = express_1.default.Router();
    const chatRepository = new messageRepositoryMongoDB_1.messageRepositoryMongoDB();
    const chatUseCaseInstance = new chat_1.chatUseCase(chatRepository);
    const chatControllerInstance = new chatController_1.chatController(chatUseCaseInstance, app_1.io);
    router.post("/send", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, chatControllerInstance.sendMessage.bind(chatControllerInstance));
    router.get("/getAllMessages/:senderId/:receiverId", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, chatControllerInstance.getChatHistory.bind(chatControllerInstance));
    router.get("/getChatUsers/:id", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, chatControllerInstance.getChatUsers.bind(chatControllerInstance));
    router.post("/checkGrammar", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        console.log("checking grammer");
        const genAi = new generative_ai_1.GoogleGenerativeAI(process.env.GENAI_API);
        const model = genAi.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are a perfect English teacher. Your task is to correct the grammar and spelling mistakes in the following sentence:${content}. 
       The sentence is meant to be sent to a friend via a chat app. Please provide the corrected version of the sentence.`;
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const text = response.text();
        console.log(text);
        res.json(text);
    }));
    router.post("/Audioupload", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, audioMiddleware_1.default.single("audio"), (req, res) => {
        console.log("Inside audio URL logic");
        const file = req.file;
        if (!file) {
            return res.status(400).send("No file uploaded.");
        }
        // Cloudinary URL
        const fileUrl = file.path;
        res.json({ fileUrl: fileUrl });
    });
    router.get("/currentUserDetails/:id", authMiddleware_1.default, checkBlockMiddleware_1.isBlocked, chatControllerInstance.currentUserDetails.bind(chatControllerInstance));
    return router;
}
exports.default = ChatRouter;
