import React from 'react'
import Image from 'next/image'


const Page = () => {
    return (
        <div className="flex h-screen">
            {/* Linkes Div - Blauer Bereich */}
            <div className="bg-seaBlue w-1/2 flex items-center justify-center">
                <div className="text-white font-bold text-2xl text-center">
                    <Image  src="/logo.svg" alt="Logo" width={200} height={200}/>
                    <p>Spielend leicht</p>
                    <p>dein Wissen</p>
                    <p>Abfragen</p>
                </div>
            </div>

            {/* Rechtes Div */}
            <div className="w-1/2  flex mt-[200px] justify-center">
                <h1 className="text-5xl text-seaBlue font-bold">Willkommen</h1>
            </div>
        </div>
    )
}

export default Page
