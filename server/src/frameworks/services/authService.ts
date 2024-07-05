import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import configKeys from "../../config"
import { mailService } from "../../utils/twilio"
import { AuthServiceInterface } from "../../app/services/authServiceInterface"
export  class AuthService implements AuthServiceInterface {
    private mailService = new mailService()

    encryptPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    async comparePassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }

    generateToken(id: string): string {
        const token = jwt.sign({ id }, configKeys.JWT_KEY, { expiresIn: "5d" })
        return token
    }
    generateOTP(email: string): Promise<any> {
        console.log("inside logic", email)
        const otpStatus = this.mailService.sendOtp(email)

        return otpStatus
    }
}

