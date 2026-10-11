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
  title: "life",
  description: "A personal digital archive, scrapbook, visual journal, and memoirs by Vaibhav Gupta.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full bg-[#EDECE6] text-[#1546D9] font-sans selection:bg-[#F9B318] selection:text-[#EDECE6] flex flex-col relative font-[family-name:var(--font-syne)]">
        {/* Full-Viewport Fixed Background Layer (Stationary during scrolling) */}
        <FixedBackground />

        {/* Moving Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}
