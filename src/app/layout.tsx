import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Platformoon internal development platform",
  description: "Learning how-to be a fullcycle developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main className="flex flex-row min-h-screen w-full">
            <aside className="flex flex-col w-52 bg-violet-700 p-4 gap-4">
              <div className="flex flex-row justify-center items-center">
                <Image
                  src="/logo.jpg"
                  height={100}
                  width={100}
                  alt="Platformoon logo"
                  className="rounded-full shadow-2xl"
                />
              </div>
              <div>
                <Link href="/applications">
                  <Button variant="secondary" className="w-full bg-violet-900 hover:bg-violet-950">Apps</Button>
                </Link>
              </div>
              <div className="flex gap-4 h-full">
                <Button className="w-full self-end" variant="destructive">
                  <ExitIcon className="mr-2 h-4 w-4"></ExitIcon>
                  Sair
                </Button>
              </div>
            </aside>
            <main className="flex flex-col w-full p-4">
              <main className={inter.className}>{children}</main>
            </main>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
