import { UserDocument } from "../frameworks/database/mongodb/models/userModel";


declare global {
    namespace Express {
        interface Request {
            user?: UserDocument | null
        }
    }
}
