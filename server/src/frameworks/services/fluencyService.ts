
import { fluencyServiceInterface } from "../../app/services/fluencyServiceInterface"

import { GoogleGenerativeAI } from "@google/generative-ai"

export class fluencyService implements fluencyServiceInterface {
    // constructor(private amigorepository: amigoRepository) {}

   async FLuencyAnalysics(voice: string, user: string): Promise<any> {

           try {
               
               console.log("vvvvvvvvvvvvvvvvvvvvvvv", voice)
               const genAi = new GoogleGenerativeAI(
                   process.env.GENAI_API as string
               )
               const model = genAi.getGenerativeModel({ model: "gemini-pro" })
               const prompt =
                   JSON.stringify(`Please analyze the following text:${voice} for English fluency and provide feedback:
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
}`)

               const result = await model.generateContent(prompt)
               const response = await result.response
               const text = response.text()
               console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", text)
               return JSON.parse(text)

               
           } catch (error) {
               console.log(error)
           }
    }
}
