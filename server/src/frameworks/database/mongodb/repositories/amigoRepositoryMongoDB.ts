import { StepInstance } from "twilio/lib/rest/studio/v1/flow/engagement/step";
import { amigoRepository } from "../../../../app/repositories/amigoRepository";
import { fluencyModel } from "../models/flulency";
interface Analysis {
    english_sentence_structures: string
    filler_and_repetitive_words: string
    fluency_score: string
    feedback_for_improvement: string[]
}

interface Voice {
    text: string
    analysis: Analysis
}

export class amigoRepositoryMongoDB implements amigoRepository {
   async fluencyAnalysis(voice: Voice, user: string): Promise<any> {
        try {
           const { text, analysis } = voice
        return await fluencyModel.create({ text, analysis, user })
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
