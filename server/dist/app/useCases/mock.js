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
exports.mockUseCase = void 0;
class mockUseCase {
    constructor(_mockRepository, _mockService) {
        this._mockRepository = _mockRepository;
        this._mockService = _mockService;
    }
    submitQuestion(Questions, Answers, score, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const feedbackObj = yield this._mockService.generateFeedback(Questions, Answers, score, id);
            console.log("0feeedbackkobjecttt", feedbackObj);
            yield this._mockRepository.submitQuestion(feedbackObj.total_score, feedbackObj.proficiency_level, feedbackObj.feedback, id);
            return feedbackObj;
        });
    }
}
exports.mockUseCase = mockUseCase;
