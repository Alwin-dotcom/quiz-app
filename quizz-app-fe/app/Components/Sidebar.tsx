// Sidebar.tsx
import React from 'react';

const Sidebar = () => (
    <div className="flex flex-col max-w-64 bg-seaBlue text-white h-screen">
        <div className="flex justify-center h-16 bg-seaBlue">
            <span className="text-xl font-bold mt-7 ">IU Quizly</span>
        </div>
        <nav className="flex-1 px-2 py-4">
            <div className="flex items-center px-4 py-2 mt-20 text-gray-100 hover:bg-gray-700">

                Start
            </div>
            <div className="flex items-center px-4 py-2 mt-10 text-gray-100 hover:bg-gray-700">

                Spielen
            </div>
            <div className="flex items-center px-4 py-2 mt-10 text-gray-100 hover:bg-gray-700">

                Bibliothek
            </div>
        </nav>
    </div>
);

export default Sidebar;
