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
  title: "LIFE — life.vaibhv19.dev",
  description: "A personal digital archive, scrapbook, visual journal, and memoirs by Vaibhav Gupta.",
  icons: {
    icon: "/icon.svg",
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
      className={`${syne.variable} h-full antialiased dark`}
    >
      <body className="min-h-full w-full bg-[#722F37] text-[#F8F4E7] font-sans selection:bg-[#D7A781] selection:text-[#722F37] flex flex-col relative font-[family-name:var(--font-syne)]">
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
