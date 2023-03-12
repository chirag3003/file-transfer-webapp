import { Server, Socket } from "socket.io";
import Room from "./room.interfact";

function socketHandler(io: Server, socket: Socket, roomId: string, room: Room) {
    socket.emit("roomData", room);
    socket.on("disconnect", () => {
        console.log("disconeect");
    });
    socket.on("iceCandid", (ice) => {
        console.log("ice");
        socket.to(roomId).emit(ice);
    });
    socket.on("joined", () => {
        socket.to(roomId).emit("Joined");
    });
    socket.on("offer", (offer) => {
        room.offer = offer;
    });
    socket.on("answer", (answer) => {
        socket.to(roomId).emit("answer", answer);
        room.answer = answer;
    });
}

export default socketHandler;
