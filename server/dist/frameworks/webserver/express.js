"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import morgan from "morgan"
const cors_1 = __importDefault(require("cors"));
//import cookieParser from "cookie-parser"
const expressConfig = (app) => {
    // app.use(morgan("dev"))
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/uploads', express_1.default.static('src/frameworks/webserver/middlewares/uploads'));
    //app.use(cookieParser())
};
exports.default = expressConfig;
