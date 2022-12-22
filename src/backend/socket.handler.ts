import { Server, Socket } from "socket.io";
import { Rooms } from "./room.interfact";

function socketHandler(io: Server, socket: Socket, roomId: string, rooms: Rooms) {
    socket.on("disconnect", () => {
        console.log("disconeect");
    });
}

export default socketHandler;
