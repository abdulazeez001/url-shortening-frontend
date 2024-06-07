import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test",
  description: "Contacts test by Abdulazeez Shittu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <Header />
          <div className="">
            <div className="mt-[50px] px-6 md:px-10 lg:px-16 bg-white py-8">
              <div className="">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
