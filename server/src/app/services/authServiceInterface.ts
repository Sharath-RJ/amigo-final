

export interface AuthServiceInterface {
    encryptPassword(password: string): string
    comparePassword(password: string, hashedPassword: string): Promise<boolean>
    generateToken(id: string): string
    generateOTP(phoneNumber: string): Promise<any>
    // verifyToken(token: string): any
}
