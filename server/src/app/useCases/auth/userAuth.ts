
import { UserRepository } from "../../../app/repositories/userReppository"
import { AuthServiceInterface } from "../../services/authServiceInterface"
import { User } from "../../../entities/user"

export class AuthUseCase {
    constructor(private _userRepository: UserRepository, private _authService: AuthServiceInterface) {}

    async register(  username: string ,  email: string,  password: string, phoneNumber:string , role:string): Promise<boolean> {
        
       const bcryptedPassword= await this._authService.encryptPassword(password)
       return await this._userRepository.createUser(username, email, bcryptedPassword, phoneNumber, role)
    }

   async login(email: string, password: string): Promise<{ token: string, user: User } | null> {
    console.log("Attempting to authenticate user with email:", email);
    const user = await this._userRepository.authenticateUser(email);
    if (user) {
        console.log("User found:", user);
        const passwordMatch = await this._authService.comparePassword(password, user.password);
        if (passwordMatch) {
            const token = this._authService.generateToken(user._id);
            console.log("Password match, generating token");
            return { token, user };
        } else {
            console.log("Password mismatch for user:", user);
        }
    } else {
        console.log("User not found for email:", email);
    }
    return null;
}


    async generateOtp(phoneNumber: string): Promise<any> {
        console.log("generate otp use case",phoneNumber)
        return await this._authService.generateOTP(phoneNumber)
    }
}
