import Navbar from "@/components/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import SideBarContainer from "@/components/Sidebar/SideBarContainer";
import { getCurrentUser } from "@/lib/serverCookies";
import MyThemeProvider from "@/providers/MyThemeProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Mverse",
  description: "Mverse App",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#2d3748" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = getCurrentUser();

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${font.className} dark:bg-neutral-800 dark:text-slate-50 h-full`}
      >
        <MyThemeProvider>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <div className="flex mt-[50px]">
            <SideBarContainer />
            <div className="w-full mb-[70px] md:mb-0">{children}</div>
          </div>
        </MyThemeProvider>
      </body>
    </html>
  );
}
