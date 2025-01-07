// RootLayout.tsx
'use client'
import "./globals.css";
import { Roboto } from "next/font/google";
import {usePathname} from "next/navigation";
import Sidebar from "./Components/Sidebar";


const roboto = Roboto({
    weight: ["400", "500", "700", "900"],
    subsets: ["latin"],
});


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

    const pathname = usePathname();

    const showSidebar = pathname !== "/login";

    return (
        <html lang="en">
        <body
            className={` ${roboto.className} antialiased`}>
        <div className="flex h-screen">
            {showSidebar && <Sidebar />}
            <div className="flex-1">{children}</div>
        </div>
        </body>
        </html>
    );
}