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
exports.amigoController = void 0;
class amigoController {
    constructor(_amigousecase) {
        this._amigousecase = _amigousecase;
    }
    fluencyAnalysis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { voice } = req.body;
            console.log("This is the input voice", voice);
            const evaluation = yield this._amigousecase.fluencyAnalysis(voice, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            console.log("evvaluationnn", evaluation);
            if (evaluation) {
                res.json(evaluation);
            }
        });
    }
}
exports.amigoController = amigoController;
