import { Request, Response, NextFunction } from "express"
import { JwtPayload, verify } from "jsonwebtoken"
import configKeys from "../../../config"
import {
    UserModel,
    UserDocument,
} from "../../database/mongodb/models/userModel"

interface customRequest extends Request{
    user?:any
}

const authenticate = (req: customRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    console.log(authorization)

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" })
    }

    const token = authorization.replace("Bearer ", "")

    verify(token, configKeys.JWT_KEY, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: "You must be logged in" })
        }

        const { id } = payload as JwtPayload
        UserModel.findById(id)
            .then((userdata) => {
                if (!userdata) {
                    return res
                        .status(401)
                        .json({ error: "You must be logged in" })
                }
                req.user = userdata
                next()
            })
            .catch((err) => {
                res.status(500).json({ error: "Internal server error" })
            })
    })
}

export default authenticate
