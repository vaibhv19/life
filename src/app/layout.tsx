import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { FixedBackground } from "@/components/FixedBackground";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Life is coming soon — life.vaibhv19.dev",
  description: "A personal space for the things that exist outside the code. — Vaibhav Gupta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} h-full antialiased light`}
    >
      <body className="min-h-full w-full bg-[#EDECE6] text-[#1546D9] font-sans selection:bg-[#F9B318] selection:text-[#1546D9] flex flex-col relative font-[family-name:var(--font-syne)]">
        {/* Full-Viewport Fixed Background Layer (Stationary) */}
        <FixedBackground />

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-full flex-1 bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}
