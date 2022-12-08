import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

function generateRoomId(): string {
    return nanoid();
}

export default generateRoomId;
