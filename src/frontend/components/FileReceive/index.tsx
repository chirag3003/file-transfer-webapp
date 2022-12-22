import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function FileReceive() {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (_evt?: any) => {
        if (inputRef.current?.value.trim() == "") {
            toast.error("Enter the code to receive the file1");
        }
    };

    

    return (
        <div className="w-full h-full border-cyan-100 border-4 rounded-3xl border-dotted p-6 flex flex-col items-center">
            <input
                ref={inputRef}
                type="text"
                className="outline-none border-2 rounded w-full p-2"
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
