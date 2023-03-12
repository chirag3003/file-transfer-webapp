import React, { ChangeEvent, useEffect, useState } from "react";
import { FilePlus, File as FileIcon, XCircle, Send, Home as HomeIcon } from "react-feather";
import { filesize } from "filesize";
import { io, Socket } from "socket.io-client";
import servers from "../../utils/rtcpeers";
import { Channel } from "diagnostics_channel";

function FileInput() {
    const [file, setFile] = useState<File | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [roomId, setRoomId] = useState("");

    const connectSocket = async () => {
        let newSocket: Socket = socket as Socket;
        if (!socket || socket.disconnected) {
            newSocket = await io(process.env.NEXT_PUBLIC_SOCKET_URL as string);
        }
        setSocket(newSocket);
        const pc = new RTCPeerConnection(servers);
        pc.onicecandidate = (event) => {
            console.log("ice");
            event.candidate && socket?.emit("offerCandidates", event.candidate);
        };
        pc.ontrack = (track) => {
            console.log(track);
        };
        setSocketEvents(newSocket, pc);
        setPcEvents(pc);
        let offerDescription = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        });
        await pc?.setLocalDescription(offerDescription);
        let offer = {
            type: offerDescription.type,
            sdp: offerDescription.sdp,
        };
        newSocket.emit("offer", offer);
    };

    const setSocketEvents = (socket: Socket, pc: RTCPeerConnection) => {
        socket.on("connect", () => {
            console.log("connected websocket");
        });
        socket.on("room created", (msg) => {
            setRoomId(msg);
        });
        socket.on("answer", async (msg) => {
            await pc?.setRemoteDescription(new RTCSessionDescription(msg));
            let ch = pc.createDataChannel("file");
            ch.binaryType = "arraybuffer";
            ch.onopen = () => {
                console.log("open");
            };
            // pc.restartIce();
        });
        socket.on("answerCandidates", async (msg) => {
            await pc.addIceCandidate(new RTCIceCandidate(msg));
        });
    };

    const setPcEvents = (pc: RTCPeerConnection) => {};

    const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files) setFile(evt.target.files[0]);
    };

    const cancelTranfer = () => {
        setFile(null);
        socket?.disconnect();
        setSocket(null);
        setRoomId("");
    };

    const transferFile = (evt: React.MouseEvent<HTMLButtonElement>) => {
        connectSocket();
    };

    return (
        <>
            {file ? (
                <div className="file-data-label h-full w-full p-2 relative flex flex-col justify-between">
                    <div className="">
                        <div className="file-details rounded-lg w-full p-4 flex items-center text-lg bg-cyan-50 text-cyan-900">
                            <FileIcon className="mr-2" />
                            <p className=" flex-1">{file.name}</p>
                            <p>{filesize(file.size) as string}</p>
                        </div>
                        {roomId && (
                            <div className="room-details rounded-lg w-full p-4 flex items-center text-lg bg-cyan-50 text-cyan-900 mt-2">
                                <HomeIcon className="mr-2" />
                                <p className=" flex-1">{roomId}</p>
                                <p>{filesize(file.size) as string}</p>
                            </div>
                        )}
                    </div>

                    <div className="buttons flex text-lg ">
                        <button
                            onClick={cancelTranfer}
                            className="cancel-button p-3 rounded-lg flex-1 mr-1 bg-red-50 text-red-500 flex items-center gap-2"
                        >
                            <XCircle />
                            <p>Cancel</p>
                        </button>
                        <button
                            onClick={transferFile}
                            className="cancel-button p-3 rounded-lg flex-1 ml-1 bg-cyan-50 text-cyan-500 flex items-center gap-2"
                        >
                            <Send />
                            <p>Transfer</p>
                        </button>
                    </div>
                </div>
            ) : (
                <label
                    htmlFor="file-input"
                    className="h-full w-full p-2 text-blue-900  border-cyan-100 border-4 rounded-3xl border-dotted flex flex-col justify-center items-center"
                >
                    <p className="text-xl ">Drag and drop your file to upload</p>
                    <div className="outline-none border-2 border-cyan-100 p-2 rounded-lg my-2">
                        Browse Files
                    </div>
                    <FilePlus height={30} width={30} className={"mt-4"} />
                </label>
            )}
            <input
                type="file"
                name="file"
                id="file-input"
                className="hidden"
                onChange={handleFileChange}
            />
        </>
    );
}

export default FileInput;
