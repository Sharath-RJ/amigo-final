
import { Request, Response } from "express"
import { AuthUseCase } from "../../app/useCases/auth/userAuth"
import { AuthResponse } from "../../frameworks/types/authResponse"
import { TempOtp } from "../../frameworks/database/mongodb/models/tempOtpModel"
import { error } from "node:console"

export class AuthController {
    constructor(private authUseCase: AuthUseCase) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body
            console.log("Received login request for email:", email)
            const result: AuthResponse | null = await this.authUseCase.login(
                email,
                password
            )

            if (result) {
                const { token, user } = result
                console.log("Login successful for user:", user)
                res.status(200).json({
                    message: "Login successful",
                    token,
                    user,
                })
            } else {
                console.log("Invalid email or password for email:", email)
                res.status(401).json({ error: "Invalid email or password" })
            }
        } catch (error) {
            console.error("Error during login:", error)
            res.status(500).json({ message: "Internal server error" })
        }
    }

    async generateOtp(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password, phoneNumber, role } = req.body
            console.log("inside conteoller", req.body)
            const otp = await this.authUseCase.generateOtp(email)
            console.log("OTP generated:", otp)
            await TempOtp.findOneAndUpdate(
                { phoneNumber },
                {
                    otp,
                    phoneNumber,
                    createdAt: new Date(),
                    username,
                    email,
                    password,
                    role,
                },
                { upsert: true, new: true }
            )

            console.log("OTP stored in MongoDB")
            res.status(200).json({ message: "OTP generated successfully" })
        } catch (error) {
            console.log(error)
        }
    }

    async verifyOtp(req: Request, res: Response): Promise<Response> {
        try {
            console.log("inside verifyOtp controller", req.body)
            const { phoneNumber, otp } = req.body

            // Fetch the stored data from MongoDB
            const storedData = await TempOtp.findOne({ phoneNumber })
            console.log("stored data inside the verify function", storedData)

            if (!storedData) {
                console.log(
                    "No stored data found for phone number:",
                    phoneNumber
                )
                return res
                    .status(400)
                    .json({ error: "Invalid phone number or OTP" })
            }

            const storedOtp = storedData.otp
            console.log("stored data otp", storedOtp)
            console.log("Otp from user:", otp)

            const createdAt = storedData.createdAt
            if (!createdAt) {
                console.log("createdAt is undefined")
                return res.status(400).json({ error: "Invalid stored data" })
            }

              const expiringTime = createdAt.getTime()
              console.log("CreatedAt timestamp:", expiringTime)

              const currentTime = new Date().getTime()
              console.log("Current timestamp:", currentTime)

              const otpAge = (currentTime - expiringTime) / 1000 / 60 // Age in minutes
              console.log("OTP age:", otpAge)

              if (otpAge > 3) {
                  console.log("OTP has expired")
                  return res.status(400).json({ error: "OTP has expired" })
              }

            if (storedOtp == otp) {
                if (
                    !storedData.username ||
                    !storedData.email ||
                    !storedData.password ||
                    !storedData.phoneNumber
                ) {
                    return res
                        .status(400)
                        .json({ error: "Invalid stored user data" })
                }

                // OTP is correct, register the user
                const success = await this.authUseCase.register(
                    storedData.username,
                    storedData.email,
                    storedData.password,
                    storedData.phoneNumber,
                    storedData.role
                )

                if (success) {
                    // Remove the OTP entry after successful registration
                    await TempOtp.deleteOne({ phoneNumber })

                    return res.status(200).json({
                        message:
                            "OTP verified and user registered successfully",
                    })
                } else {
                    return res
                        .status(400)
                        .json({ error: "Registration failed" })
                }
            } else {
                console.log("Invalid OTP")
                return res.status(400).json({ error: "Invalid OTP" })
            }
        } catch (error) {
            console.error("OTP verification error:", error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}
