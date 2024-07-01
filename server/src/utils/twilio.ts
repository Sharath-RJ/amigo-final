import { Twilio } from "twilio"

export class TwilioService {
    private client: Twilio
    private fromNumber: string

    constructor(accountSid: string, authToken: string, fromNumber: string) {
        
        this.client = new Twilio(accountSid, authToken)
        this.fromNumber = fromNumber
        console.log("from number",this.fromNumber)
    }
    private generateOtp(): string {
        return Math.floor(1000 + Math.random() * 9000).toString() // Generates a number between 1000 and 9999
    }
    async sendOtp(phoneNumber: string): Promise<any> {
        const otp = this.generateOtp()
        console.log("from phone number",this.fromNumber)
        try {
            await this.client.messages.create({
                body: `Your verification code is ${otp}`,
                from: this.fromNumber, // This is the Twilio phone number
                to: "+91"+phoneNumber,
            })
            console.log(`OTP sent to ${phoneNumber}`)
            return otp;
        } catch (error) {
            throw new Error(`Failed to send OTP: ${error}`)
        }
    }

    // async verifyOtp(phoneNumber: string, code: string): Promise<any> {
    //     try {
    //         const verificationCheck = await this.client.verify
    //             .services(this.serviceSid)
    //             .verificationChecks.create({ to: phoneNumber, code: code })

    //         return verificationCheck
    //     } catch (error) {
    //         throw new Error(`Failed to verify OTP: ${error}`)
    //     }
    // }
}
