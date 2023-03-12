import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import servers from "../../utils/rtcpeers";

function FileReceive() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [roomId, setRoomId] = useState("");

    const connectSocket = async (roomId: string) => {
        let newSocket: Socket = socket as Socket;
        if (!socket || socket.disconnected) {
            newSocket = await io(
                (process.env.NEXT_PUBLIC_SOCKET_URL as string) + `?roomId=${roomId}`
            );
        }
        const pc = new RTCPeerConnection(servers);
        setSocketEvents(newSocket, pc);
        setSocket(newSocket);
        setPcEvents(pc);
    };

    const setDataChannel = async (pc: RTCPeerConnection) => {
        let ch = pc.createDataChannel("file");
        console.log(ch);
        ch.binaryType = "arraybuffer";
        ch.onmessage = (msg) => {
            console.log(msg);
        };
    };

    const setSocketEvents = async (socket: Socket, pc: RTCPeerConnection) => {
        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("roomData", async (msg) => {
            if (!msg.offer) {
                console.log(msg, "from inside");

                return;
            }
            console.log(msg);
            await pc?.setRemoteDescription(new RTCSessionDescription(msg.offer));
            setDataChannel(pc);
            let answerDescription = await pc?.createAnswer();
            await pc?.setLocalDescription(answerDescription);
            let answer = {
                type: answerDescription.type,
                sdp: answerDescription.sdp,
            };
            socket.emit("answer", answer);
        });

        socket.on("offerCandidates", async (msg) => {
            await pc.addIceCandidate(new RTCIceCandidate(msg));
        });
    };

    const setPcEvents = async (pc: RTCPeerConnection) => {
        pc.onicecandidate = (event) => {
            console.log("ice");
            event.candidate && socket?.emit("answerCandidates", event.candidate);
        };
        pc.ontrack = (track) => {
            console.log(track);
        };
    };

    const handleSubmit = (_evt?: any) => {
        if (inputRef.current?.value.trim() == "") {
            toast.error("Enter the code to receive the file1");
            return;
        }
        let roomId = inputRef.current?.value.trim() as string;
        setRoomId(roomId);
        connectSocket(roomId);
    };

    return (
        <div className="w-full h-full border-cyan-100 border-4 rounded-3xl border-dotted p-6 flex flex-col items-center">
            <input
                ref={inputRef}
                type="text"
                className="outline-none border-2 rounded w-full p-2 bg-white text-black"
                placeholder="Enter the code"
            />

            <button
                onClick={handleSubmit}
                className="bg-cyan-50 text-cyan-600 p-3 w-full my-4 border-2 rounded"
            >
                Get File
            </button>
        </div>
    );
}

export default FileReceive;
