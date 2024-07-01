import { User } from "../entities/user"// Adjust the import path

export interface AuthResponse {
    user: User
    token: string
}
