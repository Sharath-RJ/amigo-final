

export interface AuthServiceInterface {
    encryptPassword(password: string): string
    comparePassword(password: string, hashedPassword: string): Promise<boolean>
    generateToken(id: string): string
    generateOTP(email: string): Promise<any>
    // verifyToken(token: string): any
}
