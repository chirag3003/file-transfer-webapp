export default interface Room {
    roomId: string;
    connections: [RoomConnection];
}

export interface Rooms {
    [id: string]: Room;
}

export interface RoomConnection {
    id: string;
    isSender: boolean;
}
