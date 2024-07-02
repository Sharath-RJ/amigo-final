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
exports.AuthUseCase = void 0;
class AuthUseCase {
    constructor(_userRepository, _authService) {
        this._userRepository = _userRepository;
        this._authService = _authService;
    }
    register(username, email, password, phoneNumber, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const bcryptedPassword = yield this._authService.encryptPassword(password);
            return yield this._userRepository.createUser(username, email, bcryptedPassword, phoneNumber, role);
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Attempting to authenticate user with email:", email);
            const user = yield this._userRepository.authenticateUser(email);
            if (user) {
                console.log("User found:", user);
                const passwordMatch = yield this._authService.comparePassword(password, user.password);
                if (passwordMatch) {
                    const token = this._authService.generateToken(user._id);
                    console.log("Password match, generating token");
                    return { token, user };
                }
                else {
                    console.log("Password mismatch for user:", user);
                }
            }
            else {
                console.log("User not found for email:", email);
            }
            return null;
        });
    }
    generateOtp(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("generate otp use case", phoneNumber);
            return yield this._authService.generateOTP(phoneNumber);
        });
    }
}
exports.AuthUseCase = AuthUseCase;
