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
exports.mockservice = void 0;
const generative_ai_1 = require("@google/generative-ai");
class mockservice {
    constructor(mockepository) {
        this.mockepository = mockepository;
    }
    generateFeedback(Questions, Answers, score, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("generating feedback");
            console.log(Questions);
            console.log(Answers);
            console.log("Score", score);
            const previousData = yield this.mockepository.previousFeedback(id);
            // Combine current data with previous data
            const combinedData = {
                previousFeedback: previousData ? previousData.feedback : "",
                previousScore: previousData ? previousData.score : 0,
                Questions,
                Answers,
                score,
            };
            const genAi = new generative_ai_1.GoogleGenerativeAI(process.env.GENAI_API);
            const model = genAi.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `
Please evaluate a user's English proficiency level based on their answers to a set of questions. Here are the details:

- Previous Feedback: ${combinedData.previousFeedback}
- Previous Score: ${combinedData.previousScore}
- Questions: ${JSON.stringify(combinedData.Questions)} (This is an array of objects, each containing a question and its correct answer)
- User's Answers: ${JSON.stringify(combinedData.Answers)}
- User's Score: ${combinedData.score}

Tasks:
1. Verify that the user's answers match the correct answers in the Questions array.
2. Use the provided score (${combinedData.score}) to generate the results.
3. Provide a star rating out of 5 based on the score. It must be a number between 1 and 5.
4. Assess the user's English proficiency level as either beginner, intermediate, or advanced based on their performance in different sections:
   - The first 5 questions are beginner level.
   - The next 5 questions are intermediate level.
   - The remaining 5 questions are advanced level.
   - If the user performs well in the first 5 questions, they are at the beginner level. Similarly, evaluate intermediate and advanced levels based on the respective questions.
5. Offer constructive feedback to help the user improve their English skills. Include what they need to learn next and identify any weak areas.

Please provide the evaluation in the following format: note that it should be a valid JSON and should not contain any special characters or unwanted strings at the beginning and end of the following format.

{
  "total_score": ${combinedData.score},
  "star_rating": "<star_rating>",
  "proficiency_level": "<proficiency_level>",
  "feedback": "<feedback>"
}
`;
            const result = yield model.generateContent(prompt);
            const response = yield result.response;
            const text = response.text();
            console.log(text);
            return JSON.parse(text);
        });
    }
}
exports.mockservice = mockservice;
