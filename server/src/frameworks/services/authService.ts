import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import configKeys from "../../config"
import { TwilioService } from "../../utils/twilio"
import { AuthServiceInterface } from "../../app/services/authServiceInterface"
export  class AuthService implements AuthServiceInterface {
    private _twilioService  = new  TwilioService()


    encryptPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

   async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

    generateToken(id: string): string {
        const token = jwt.sign({ id }, "secret", { expiresIn: "5d" })
        return token
    }
    generateOTP(phoneNumber: string): Promise<any> {
        console.log("inside logic", phoneNumber)
        const otpStatus = this._twilioService .sendOtp(phoneNumber)
        
  
        return otpStatus
    }
}

