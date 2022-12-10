"use clien"

import React, { ChangeEvent, useState } from "react";
import { FilePlus, File as FileIcon, XCircle, Send } from "react-feather";
import { filesize } from "filesize";

function FileInput() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files) setFile(evt.target.files[0]);
    };

    //remove the file if the user cancels the transfer
    const cancelTranfer = () => {
        setFile(null);
    };

    return (
        <>
            {file ? (
                <div className="file-data-label h-full w-full p-2 relative flex flex-col justify-between">
                    <div className="file-details rounded-lg w-full p-4 flex items-center text-lg bg-cyan-50 text-cyan-900">
                        <FileIcon className="" />
                        <p className="mx-5 flex-1">{file.name}</p>
                        <p>{filesize(file.size) as string}</p>
                    </div>

                    <div className="buttons flex text-lg ">
                        <button
                            onClick={cancelTranfer}
                            className="cancel-button p-3 rounded-lg flex-1 mr-1 bg-red-50 text-red-500 flex items-center gap-2"
                        >
                            <XCircle />
                            <p>Cancel</p>
                        </button>
                        <button className="cancel-button p-3 rounded-lg flex-1 ml-1 bg-cyan-50 text-cyan-500 flex items-center gap-2">
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
                    <button className="outline-none border-2 border-cyan-100 p-2 rounded-lg my-2">
                        Browse Files
                    </button>
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
