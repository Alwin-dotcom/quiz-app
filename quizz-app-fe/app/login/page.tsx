import React from 'react'
import Image from 'next/image'
import LoginForm from '../Components/LoginForm'


const Page = () => {
    return (
        <div className="flex h-screen">
            {/* Linkes Div - Blauer Bereich */}
            <div className="bg-seaBlue w-1/2 flex items-center justify-center">
                <div className="text-white font-bold text-2xl text-center">
                    <Image className="ml-5" src="/logo.svg" alt="Logo" width={200} height={200}/>
                    <p>Spielend leicht</p>
                    <p>dein Wissen</p>
                    <p>Abfragen</p>
                </div>
            </div>

            {/* Rechtes Div - Weißer Bereich */}
            <div className="w-1/2 flex flex-col items-center  justify-center">
                <h1 className="text-5xl text-seaBlue font-bold mb-4">Willkommen</h1>
                <h2 className="text-2xl text-seaBlue">Login</h2>

                <LoginForm/>
            </div>




        </div>
    )
}

export default Page
