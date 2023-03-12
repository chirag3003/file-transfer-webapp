import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket.handler";
import Room, { Rooms } from "./room.interfact";
import generateRoomId from "./generateRoomId";
dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const rooms: Rooms = {};

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

io.on("connection", (socket) => {
    let roomId = socket.handshake.query.roomId as string;
    let room: Room;
    if (roomId) {
        room = rooms[roomId];
        //checking if room exists or not
        if (!room) {
            socket.emit("error", "Room not found");
            socket.disconnect();
            return;
        } else {
            socket.join(room.roomId);
            room.connections.push({
                id: socket.id,
                isSender: false,
            });
        }
    } else {
        //Creating a new room
        room = {
            roomId: generateRoomId(),
            connections: [
                {
                    id: socket.id,
                    isSender: true,
                },
            ],
            offerCandidates: [],
            answerCandidates: [],
        };
        socket.join(room.roomId);
        rooms[room.roomId] = room;
        //sending back the new room details
        socket.emit("room created", room.roomId);
    }
    socketHandler(io, socket, room.roomId, room);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
