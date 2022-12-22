import React from "react";
import Head from "next/head";
import Link from "next/link";
import FileReceive from "../components/FileReceive";

export default function Home() {
    return (
        <div>
            <Head>
                <title>File Transfer</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full h-screen bg-gray-50 p-10">
                <div className="container w-4/5 h-3/5 bg-cyan-100 rounded-3xl mx-auto relative  pt-20">
                    <div className="menu-buttons mx-auto p-2 flex w-max mb-4 rounded-lg bg-white shadow-sm text-blue-900">
                        <Link href={"/"}>
                            <button className="p-2 mx-2 w-40 rounded-lg bg-cyan-50 shadow-sm">
                                Send File
                            </button>
                        </Link>
                        <Link href={"/receive"}>
                            <button className="p-2 mx-2 w-40 rounded-lg bg-cyan-100 shadow-sm">
                                Receive File
                            </button>
                        </Link>
                    </div>
                    <div className="title text-center">
                        <h1 className="text-5xl text-blue-900 font-bold">
                            Transfer Files to anyone
                        </h1>
                    </div>
                    <div
                        id="input-container"
                        className=" w-1/2 rounded-3xl mx-auto bg-white shadow-md hover:shadow-lg transition-all p-4"
                    >
                        <FileReceive />
                    </div>
                </div>
            </main>
        </div>
    );
}