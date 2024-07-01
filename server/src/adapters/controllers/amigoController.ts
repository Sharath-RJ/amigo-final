import { Request, Response } from "express"
import { amigoUsecase } from "../../app/useCases/amigo"
interface customRequest extends Request {
    user?: any
}
export class amigoController {
    constructor(private _amigousecase: amigoUsecase) {}

    async fluencyAnalysis(req: customRequest, res: Response): Promise<any> {
        const {voice} = req.body
        console.log("This is the input voice",voice)
        const evaluation = await this._amigousecase.fluencyAnalysis(voice,req.user?._id)
        console.log("evvaluationnn",evaluation)
        if(evaluation){
             res.json(evaluation)
        }
    }
}
