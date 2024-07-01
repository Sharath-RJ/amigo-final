import { amigoRepository } from "../repositories/amigoRepository"
import { mockRepository } from "../repositories/mockTestRepository"
import { fluencyServiceInterface } from "../services/fluencyServiceInterface"
import { MockServiceInterface } from "../services/mockServiceInterface"

export class amigoUsecase {
    constructor(
        private _amigoRepository: amigoRepository,
        private _fluencyService: fluencyServiceInterface,
    ) {}

    async fluencyAnalysis(voice:string, user:string): Promise<any> {
        const FluencyFeedback= await this._fluencyService.FLuencyAnalysics(voice, user)
        console.log("ffffffffffffffffffffffff",FluencyFeedback)
        const result = await this._amigoRepository.fluencyAnalysis(FluencyFeedback, user)
        return FluencyFeedback
    }
}
