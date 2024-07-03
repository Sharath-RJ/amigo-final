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
exports.AuthController = void 0;
const tempOtpModel_1 = require("../../frameworks/database/mongodb/models/tempOtpModel");
class AuthController {
    constructor(authUseCase) {
        this.authUseCase = authUseCase;
    }
    // private temporaryStore: {
    //     [key: string]: {
    //         otp: string
    //         username: string
    //         email: string
    //         password: string
    //         phoneNumber: string
    //     }
    // } = {}
    // async register(req: Request, res: Response, ): Promise<void> {
    //     try {
    //         const { username, email, password, PhoneNumber } = req.body
    //         console.log("meflemlfml", PhoneNumber)
    //         const sendOtp = await this.authUseCase.generateOtp(PhoneNumber)
    //         console.log("ooootttpp", sendOtp)
    //         const success = await this.authUseCase.register(
    //             username,
    //             email,
    //             password,
    //             PhoneNumber
    //         )
    //         if (success) {
    //             res.status(201).json({
    //                 message: "User registered successfully",
    //                 otp: sendOtp,
    //             })
    //         } else {
    //             res.status(400).json({ error: "Registration failed" })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({ error: "Internal server error" })
    //     }
    // }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log("Received login request for email:", email);
                const result = yield this.authUseCase.login(email, password);
                if (result) {
                    const { token, user } = result;
                    console.log("Login successful for user:", user);
                    res.status(200).json({
                        message: "Login successful",
                        token,
                        user,
                    });
                }
                else {
                    console.log("Invalid email or password for email:", email);
                    res.status(401).json({ error: "Invalid email or password" });
                }
            }
            catch (error) {
                console.error("Error during login:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    generateOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, phoneNumber, role } = req.body;
                console.log("inside conteoller", req.body);
                const otp = yield this.authUseCase.generateOtp(phoneNumber);
                yield tempOtpModel_1.TempOtp.findOneAndUpdate({ phoneNumber }, {
                    otp,
                    phoneNumber,
                    createdAt: new Date(),
                    username,
                    email,
                    password,
                    role,
                }, { upsert: true, new: true });
                console.log("OTP stored in MongoDB");
                res.status(200).json({ message: "OTP generated successfully" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside verifyOtp controller", req.body);
                const { phoneNumber, otp } = req.body;
                // Fetch the stored data from MongoDB
                const storedData = yield tempOtpModel_1.TempOtp.findOne({ phoneNumber });
                console.log("stored data inside the verify function", storedData);
                if (!storedData) {
                    console.log("No stored data found for phone number:", phoneNumber);
                    res
                        .status(400)
                        .json({ error: "Invalid phone number or OTP" });
                }
                const storedOtp = storedData === null || storedData === void 0 ? void 0 : storedData.otp;
                console.log("stored data otp", storedOtp);
                console.log("Otp from user:", otp);
                if (storedOtp == otp) {
                    if (!(storedData === null || storedData === void 0 ? void 0 : storedData.username) || !(storedData === null || storedData === void 0 ? void 0 : storedData.email) || !(storedData === null || storedData === void 0 ? void 0 : storedData.password) || !(storedData === null || storedData === void 0 ? void 0 : storedData.phoneNumber)) {
                        res
                            .status(400)
                            .json({ error: "Invalid stored user data" });
                    }
                    // OTP is correct, register the user
                    if ((storedData === null || storedData === void 0 ? void 0 : storedData.username) !== undefined) {
                        const success = yield this.authUseCase.register(storedData === null || storedData === void 0 ? void 0 : storedData.username, storedData === null || storedData === void 0 ? void 0 : storedData.email, storedData === null || storedData === void 0 ? void 0 : storedData.password, storedData === null || storedData === void 0 ? void 0 : storedData.phoneNumber, storedData === null || storedData === void 0 ? void 0 : storedData.role);
                        if (success) {
                            // Remove the OTP entry after successful registration
                            yield tempOtpModel_1.TempOtp.deleteOne({ phoneNumber });
                            res.status(200).json({
                                message: "OTP verified and user registered successfully",
                            });
                        }
                        else {
                            res.status(400).json({ error: "Registration failed" });
                        }
                    }
                }
                else {
                    console.log("Invalid OTP");
                    res.status(400).json({ error: "Invalid OTP" });
                }
            }
            catch (error) {
                console.error("OTP verification error:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.AuthController = AuthController;
