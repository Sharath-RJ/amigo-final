"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../../../config"));
const userModel_1 = require("../../database/mongodb/models/userModel");
const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    (0, jsonwebtoken_1.verify)(token, config_1.default.JWT_KEY, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: "You must be logged in" });
        }
        const { id } = payload;
        userModel_1.UserModel.findById(id)
            .then((userdata) => {
            if (!userdata) {
                return res
                    .status(401)
                    .json({ error: "You must be logged in" });
            }
            req.user = userdata;
            next();
        })
            .catch((err) => {
            res.status(500).json({ error: "Internal server error" });
        });
    });
};
exports.default = authenticate;
