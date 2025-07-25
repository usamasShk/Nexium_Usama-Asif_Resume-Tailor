import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CosmicParticlesWrapper from "@/components/CosmicParticlesWrapper";
import AuthButtons from "@/components/AuthButtons";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Resume Tailor",
  description: "AI-powered resume tailoring app",
};

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black backdrop-blur-xl border-b border-[#a259ff]/40 flex items-center justify-between px-8 py-4 shadow-lg">
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="12" fill="#a259ff"/>
          <path d="M16 32L32 16M16 16h16v16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xl font-extrabold text-white tracking-tight drop-shadow-glow">Resume Tailor</span>
      </div>
      <div className="flex gap-6 items-center">
        <a href="/dashboard" className="text-white hover:text-[#a259ff] font-semibold transition-colors duration-200 drop-shadow-glow">Dashboard</a>
        <AuthButtons />
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white min-h-screen`}>
        <Navbar />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
