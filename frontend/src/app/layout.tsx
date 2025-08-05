import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { AppLayout } from "@/components/layout/app-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreelanceHub - Professional Freelancer Agency Platform",
  description: "Professional freelance agency delivering exceptional digital solutions. Expert developers, designers, and digital strategists for your business needs.",
  keywords: ["freelance agency", "web development", "mobile apps", "UI/UX design", "digital marketing", "software development", "project management"],
  authors: [{ name: "FreelanceHub Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#22D3EE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased bg-cod-gray text-primary min-h-screen`}
      >
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
