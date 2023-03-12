export default interface Room {
    roomId: string;
    connections: [RoomConnection];
    offer?: any;
    answer?: any;
    offerCandidates: any[];
    answerCandidates: any[];
}

export interface Rooms {
    [id: string]: Room;
}

export interface RoomConnection {
    id: string;
    isSender: boolean;
}
