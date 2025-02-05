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
exports.mockTestRepositoryMongoDB = void 0;
const mockTest_1 = require("../models/mockTest");
class mockTestRepositoryMongoDB {
    submitQuestion(score, proficiencyLevel, feedback, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mockTest_1.MockTest.create({ user, score, proficiencyLevel, feedback });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    previousFeedback(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mockTest_1.MockTest.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.mockTestRepositoryMongoDB = mockTestRepositoryMongoDB;
