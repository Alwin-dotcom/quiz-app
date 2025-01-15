import React from 'react';
import Image from "next/image";
import {Button} from "@mui/material";
import Link from "next/link";

const Sidebar = () => (
    <div className="flex flex-col w-64 bg-seaBlue text-white h-screen  fixed top-0 left-0 overflow-y-auto ">
        {/* Logo */}
        <Link href="/" legacyBehavior>
            <div className="flex justify-center mt-5">
                <Image src="/logo.svg" alt="Logo" width={170} height={150}/>
            </div>
        </Link>


        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 flex flex-col justify-center items-center gap-4">
            <Link href="/" legacyBehavior>
                <Button
                    className="w-1/2 mx-auto flex flex-col items-center border-2 border-white
                rounded px-4 py-2 text-white hover:bg-hoverBlue focus:ring-2 focus:ring-white"
                >
                    <Image src="/Home.png" alt="Logo" width={50} height={50}/>
                    <span className="mt-2 text-white">Start</span>
                </Button>
            </Link>

            <Link href="/play" legacyBehavior>
                <Button
                    className="w-1/2 mx-auto flex flex-col items-center border-2 border-white rounded px-4
                 py-2 text-white hover:bg-hoverBlue focus:ring-2 focus:ring-white"
                >
                    <Image src="/Play.svg" alt="Logo" width={50} height={50}/>
                    <span className="mt-2 text-white">Spielen</span>
                </Button>
            </Link>

            <Link href="/bib" legacyBehavior>
                <Button
                    className="w-1/2 mx-auto flex flex-col items-center border-2 border-white rounded
                 px-4 py-2 text-white hover:bg-hoverBlue focus:ring-2 focus:ring-white"
                >
                    <Image src="/Books.svg" alt="Logo" width={50} height={50}/>
                    <span className="mt-2 text-white">Bibliothek</span>
                </Button>
            </Link>
        </nav>
        <div className="px-2 py-4 flex flex-col gap-4 items-center ">
            <Link href="/profile" legacyBehavior>
                <Button
                    className="w-1/2 mx-auto flex flex-col items-center border-2 border-white rounded px-4 py-2
                 text-white hover:bg-hoverBlue focus:ring-2 focus:ring-white"
                >
                    <Image src="/Customer.svg" alt="Logo" width={50} height={50}/>
                    <span className="mt-2 text-white">Profil</span>
                </Button>
            </Link>


            <Button

                variant="contained"
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    width: '70%',
                    margin: '0 auto',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            >
                Abmelden
            </Button>
        </div>
    </div>
);

export default Sidebar;
