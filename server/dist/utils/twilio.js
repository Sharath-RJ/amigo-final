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
const twilio_1 = require("twilio");
class TwilioService {
    constructor(accountSid, authToken, fromNumber) {
        this.client = new twilio_1.Twilio(accountSid, authToken);
        this.fromNumber = fromNumber;
        console.log("from number", this.fromNumber);
    }
    generateOtp() {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a number between 1000 and 9999
    }
    sendOtp(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.generateOtp();
            console.log("from phone number", this.fromNumber);
            try {
                yield this.client.messages.create({
                    body: `Your verification code is ${otp}`,
                    from: this.fromNumber, // This is the Twilio phone number
                    to: "+91" + phoneNumber,
                });
                console.log(`OTP sent to ${phoneNumber}`);
                return otp;
            }
            catch (error) {
                throw new Error(`Failed to send OTP: ${error}`);
            }
        });
    }
}
exports.TwilioService = TwilioService;
