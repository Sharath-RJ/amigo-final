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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fluencyService = void 0;
const generative_ai_1 = require("@google/generative-ai");
class fluencyService {
    // constructor(private amigorepository: amigoRepository) {}
    FLuencyAnalysics(voice, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("vvvvvvvvvvvvvvvvvvvvvvv", voice);
                const genAi = new generative_ai_1.GoogleGenerativeAI(process.env.GENAI_API);
                const model = genAi.getGenerativeModel({ model: "gemini-pro" });
                const prompt = JSON.stringify(`Please analyze the following text:${voice} for English fluency and provide feedback:
  1. Evaluate if the text uses proper English sentence structures.
  2. Check for filler words and repetitive words that may reduce fluency.
  3. Provide a fluency score out of 10, where 10 indicates perfect fluency.
  4. Offer feedback on how the text could be improved to enhance its fluency.
  
  Generate the result in the following JSON format:
{
  "text": "Insert the original text here.",
  "analysis": {
    "english_sentence_structures": "Provide feedback on sentence structures.",
    "filler_and_repetitive_words": "Comment on filler words and repetitions.",
    "fluency_score":10,
    "feedback_for_improvement": [
      "Suggestions for improvement 1.",
      "Suggestions for improvement 2.",
      "Suggestions for improvement 3."
    ]
  }
}`);
                const result = yield model.generateContent(prompt);
                const response = yield result.response;
                const text = response.text();
                console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", text);
                return JSON.parse(text);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.fluencyService = fluencyService;
