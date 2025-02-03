// RootLayout.tsx
'use client'
import "./globals.css";
import {Roboto} from "next/font/google";
import {usePathname} from "next/navigation";
import Sidebar from "./Components/Sidebar";
import UserInfo from "@/app/Components/UserInfo";
import {UserProvider} from "./Context/UserContext";
import {Providers} from "./Components/Provider";

const roboto = Roboto({
    weight: ["400", "500", "700", "900"],
    subsets: ["latin"],
});

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

    const pathname = usePathname();

    const showSidebar = pathname !== "/login";

    return (

        <UserProvider>
            <html lang="en">
            <body className={`${roboto.className} antialiased`}>
            <div className="flex h-screen">
                {showSidebar && (
                    <div className="fixed top-0 left-0 w-64 bg-seaBlue text-white h-screen overflow-y-hidden">
                        <Sidebar/>
                    </div>
                )}
                <UserInfo></UserInfo>
                <div className={`flex-1 ${showSidebar ? "ml-64" : ""} overflow-y-auto `}>
                    <Providers>
                        {children}
                    </Providers>
                </div>
            </div>
            </body>
            </html>
        </UserProvider>


    );
}