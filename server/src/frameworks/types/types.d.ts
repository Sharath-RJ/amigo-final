import { UserDocument } from "../database/mongodb/models/userModel";


declare global {
    namespace Express {
        interface Request {
            user?: UserDocument | null
        }
    }
}
