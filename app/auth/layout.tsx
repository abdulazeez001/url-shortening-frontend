import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";

export const metadata: Metadata = {
  title: "Sigma",
  description: "Your Ultimate Fraud Detection Solution from Pastel",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen w-full flex-col justify-center items-center px-6 md:px-0">
          <div className="border w-full  md:w-[400px] px-6 py-8 bg-white border-[#D0D5DD] rounded-xl flex flex-col justify-center content-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
