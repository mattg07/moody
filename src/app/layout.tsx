import type { Metadata } from "next";
import { Baumans, Inter } from "next/font/google";
import Header from "../components/ui/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baumans = Baumans({
  weight: '400',
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: "MoodB",
  description: "Describe your vibes w a board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className="bg-scarlet">
        {" "}
        <Header />
        {children}
      </body>
    </html>
  );
}
