

export class TwilioService {

    constructor() {}
    private generateOtp(): string {
        return Math.floor(1000 + Math.random() * 9000).toString() // Generates a number between 1000 and 9999
    }
    async sendOtp(phoneNumber: string): Promise<any> {
        const otp = this.generateOtp()
        
        try {
            console.log(`OTP sent to ${phoneNumber}`)
            return 2222;
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
