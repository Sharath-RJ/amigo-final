import { mockRepository } from "../repositories/mockTestRepository"
import { MockServiceInterface } from "../services/mockServiceInterface"

export class mockUseCase {
    constructor(private _mockRepository: mockRepository, private _mockService: MockServiceInterface) {}

    async submitQuestion(Questions: any, Answers: any, score: number, id:string): Promise<any> { 
        const feedbackObj =  await this._mockService.generateFeedback(Questions, Answers, score,id)
        console.log("0feeedbackkobjecttt",feedbackObj)
         await this._mockRepository.submitQuestion(
             feedbackObj.total_score,
             feedbackObj.proficiency_level,
             feedbackObj.feedback,
             id
         )

         return  feedbackObj
    }
}