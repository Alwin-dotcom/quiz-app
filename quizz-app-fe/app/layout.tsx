import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["400", "500", "700", "900"],
    subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
