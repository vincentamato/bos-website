import type { Metadata } from "next";
import { DM_Sans, Epilogue, JetBrains_Mono, Geist, Geist_Mono } from "next/font/google";
import { Bebas_Neue, Anton } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const anton = Anton({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brown Original Series | BOS",
  description: "Streaming all of Brown University's student-produced shows and content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} ${anton.variable} antialiased bg-black`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
