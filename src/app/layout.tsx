import Navbar from "@/components/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import SideBarContainer from "@/components/Sidebar/SideBarContainer";

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
      <body
        className={`${font.className} dark:bg-slate-800 dark:text-slate-50`}
      >
        <ToasterProvider />
        <Navbar />
        <div className="flex">
          <SideBarContainer />
          <div className="sm:p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
