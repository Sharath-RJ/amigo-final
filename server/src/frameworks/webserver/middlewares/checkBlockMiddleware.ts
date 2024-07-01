import {Request, Response, NextFunction } from "express"
import { UserModel } from "../../database/mongodb/models/userModel"
interface customRequest extends Request {
    user?: any
}
export const isBlocked= async (req: customRequest, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findById(req.user?._id)
        console.log("from middleware",user)
        if (user?.isBlocked) {
            return res.status(403).json({ message: 'User is blocked. You have been logged out.', logout: true });
        }
        next();
    } catch (error) {
        console.log(error)
    }
}