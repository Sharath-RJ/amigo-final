import nodemailer from "nodemailer"
import configKeys from "../config"

export class mailService {
    constructor() {}
    private generateOtp(): string {
        return Math.floor(1000 + Math.random() * 9000).toString() // Generates a number between 1000 and 9999
    }
    async sendOtp(email: string): Promise<any> {
        console.log("inside nodemailer", email)
        const otp = this.generateOtp()

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Replace with your SMTP host
            port: 587, // Replace with your SMTP port
            secure: false, // true for 465, false for other ports
            auth: {
                user: configKeys.email, // Replace with your email
                pass: configKeys.emailPassword, // Replace with your email password
            },
            tls: {
                rejectUnauthorized: true, // Allow self-signed certificates
            },
        })
        const mailOptions = {
            from: "kerdostech@gmail.com", // sender address
            to: email, // list of receivers
            subject: "OTP from Amigo", // Subject line
            text: otp, // plain text body
            html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <div style="text-align: center;">
                    <h2 style="color: #4CAF50;">Amigo</h2>
                </div>
                <div style="text-align: center;">
                    <h3 style="color: #333;">Your One-Time Password (OTP)</h3>
                    <p style="font-size: 20px; color: #555;">Please use the following OTP to complete your verification process. This OTP is valid for 3 minutes.</p>
                    <div style="margin: 20px 0;">
                        <span style="display: inline-block; font-size: 24px; padding: 10px 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; color: #333;">${otp}</span>
                    </div>
                   
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <p style="font-size: 12px; color: #aaa;">© 2024 Amigo. All rights reserved.</p>
                </div>
            </div>`,
        }
        try {
            const info = await transporter.sendMail(mailOptions)
            console.log("Message sent: %s", info.messageId)
            return otp
        } catch (error) {
            console.error("Error occurred while sending email: %s", error)
        }
    }
}
