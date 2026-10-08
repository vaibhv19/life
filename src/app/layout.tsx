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
      className={`${syne.variable} h-full antialiased dark`}
    >
      <body className="min-h-full w-full bg-[#722F37] text-[#F8F4E7] font-sans selection:bg-[#D7A781] selection:text-[#722F37] flex flex-col relative font-[family-name:var(--font-syne)]">
        {/* Full-Viewport Fixed Background Layer (Stationary) */}
        <FixedBackground />

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}
