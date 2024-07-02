"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlocked = void 0;
const userModel_1 = require("../../database/mongodb/models/userModel");
const isBlocked = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield userModel_1.UserModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        console.log("from middleware", user);
        if (user === null || user === void 0 ? void 0 : user.isBlocked) {
            return res.status(403).json({ message: 'User is blocked. You have been logged out.', logout: true });
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.isBlocked = isBlocked;
