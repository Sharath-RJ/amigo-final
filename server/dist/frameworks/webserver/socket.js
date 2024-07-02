"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
function configureSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    // Map to store  IDs and their corresponding sockets
    const userSockets = new Map();
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
        socket.on("joinRoom", (userId) => {
            // Store the user's socket in the map
            userSockets.set(userId, socket);
            console.log(`User ${socket.id} with ID ${userId} joined the room`);
        });
        socket.on("sendMessage", (message) => {
            const { receiver } = message;
            // Emit message to the receiver's socket
            const receiverSocket = userSockets.get(receiver);
            if (receiverSocket) {
                receiverSocket.emit("newMessage", message);
                console.log(`Message sent to user with ID: ${receiverSocket.id}.`);
            }
            else {
                console.log(`Receiver with ID ${receiver} not found.`);
            }
        });
        socket.on("disconnect", () => {
            // Remove the socket from the map when the user disconnects
            userSockets.forEach((value, key) => {
                if (value === socket) {
                    userSockets.delete(key);
                    console.log(`User ${socket.id} with ID ${key} disconnected.`);
                }
            });
        });
    });
    return io;
}
exports.default = configureSocket;
