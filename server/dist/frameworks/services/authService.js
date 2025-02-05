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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const twilio_1 = require("../../utils/twilio");
class AuthService {
    constructor() {
        this.mailService = new twilio_1.mailService();
    }
    encryptPassword(password) {
        const salt = bcryptjs_1.default.genSaltSync(10);
        return bcryptjs_1.default.hashSync(password, salt);
    }
    comparePassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(password, hashedPassword);
        });
    }
    generateToken(id) {
        const token = jsonwebtoken_1.default.sign({ id }, config_1.default.JWT_KEY, { expiresIn: "5d" });
        return token;
    }
    generateOTP(email) {
        console.log("inside logic to send email", email);
        const otpStatus = this.mailService.sendOtp(email);
        return otpStatus;
    }
}
exports.AuthService = AuthService;
