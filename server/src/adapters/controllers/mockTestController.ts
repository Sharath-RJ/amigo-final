import { Console } from "console"
import { trainerUseCase } from "../../app/useCases/trainer"
import { Request, Response } from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { mockUseCase } from "../../app/useCases/mock"
interface customRequest extends Request {
    user?: any
}
export class mockTestController {
    constructor(private _mockUseCase: mockUseCase) {}

    async submitQuestion(req: customRequest, res: Response): Promise<any> {
        const {Questions, Answers, score} = req.body
        const evaluation = await this._mockUseCase.submitQuestion(Questions,Answers,score, req.user?._id)
        console.log("evvaluationnn",evaluation)
        if(evaluation){
             res.json(evaluation)
        }
    }
}
