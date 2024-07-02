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
exports.UserRepositoryMongo = void 0;
const userModel_1 = require("../../../../frameworks/database/mongodb/models/userModel");
class UserRepositoryMongo {
    createUser(username, email, password, phoneNumber, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel_1.UserModel.create({
                    username,
                    email,
                    password,
                    phoneNumber,
                    role
                });
                return true;
            }
            catch (error) {
                console.error("Error creating user:", error);
                return false;
            }
        });
    }
    authenticateUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield userModel_1.UserModel.findOne({ email }));
            if (user && user.password) {
                return user;
            }
            else {
                return null;
            }
        });
    }
}
exports.UserRepositoryMongo = UserRepositoryMongo;
