"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection_1 = __importDefault(require("./frameworks/database/mongodb/connection"));
const errorhandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorhandlingMiddleware"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes/routes"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const appError_1 = __importDefault(require("./utils/appError"));
const socket_1 = __importDefault(require("./frameworks/webserver/socket")); // Import the socket configuration
const app = (0, express_1.default)();
const server = http.createServer(app);
app.use((0, cors_1.default)());
// Connect to database
(0, connection_1.default)();
// Express configuration
(0, express_2.default)(app);
// Start server
(0, server_1.default)(server).startServer();
// Initialize Socket.IO
const io = (0, socket_1.default)(server);
exports.io = io;
// Routes
(0, routes_1.default)(app);
// Catch 404 and forward to error handler
app.use(errorhandlingMiddleware_1.default);
app.use("*", (req, res, next) => {
    next(new appError_1.default("Not found", 404));
});
