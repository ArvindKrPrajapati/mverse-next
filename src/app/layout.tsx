import Navbar from "@/components/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Mverse",
  description: "Mverse App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <ToasterProvider />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
