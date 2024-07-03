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
exports.TwilioService = void 0;
class TwilioService {
    constructor() { }
    generateOtp() {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a number between 1000 and 9999
    }
    sendOtp(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.generateOtp();
            try {
                console.log(`OTP sent to ${phoneNumber}`);
                return 2222;
            }
            catch (error) {
                throw new Error(`Failed to send OTP: ${error}`);
            }
        });
    }
}
exports.TwilioService = TwilioService;
