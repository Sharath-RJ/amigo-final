"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAuth_1 = __importDefault(require("./userAuth"));
const chat_1 = __importDefault(require("./chat"));
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
const posts_1 = __importDefault(require("./posts"));
const mock_1 = __importDefault(require("./mock"));
const amigo_1 = __importDefault(require("./amigo"));
const trainer_1 = __importDefault(require("./trainer"));
const notification_1 = __importDefault(require("./notification"));
const payment_1 = __importDefault(require("./payment"));
const routes = (app) => {
    app.use("/api/user-auth", (0, userAuth_1.default)());
    app.use("/api/post", (0, posts_1.default)());
    app.use("/api/chat", (0, chat_1.default)());
    app.use("/api/user", (0, user_1.default)());
    app.use("/api/admin", (0, admin_1.default)());
    app.use("/api/mock", (0, mock_1.default)());
    app.use("/api/amigo", (0, amigo_1.default)());
    app.use("/api/trainer", (0, trainer_1.default)());
    app.use("/api/notification", (0, notification_1.default)());
    app.use("/api/payment", (0, payment_1.default)());
};
exports.default = routes;
