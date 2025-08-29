import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@shared/providers/AppProviders";
import { GlobalToast } from "@/shared/components/GlobalToast.com";
import { APP_CONFIG } from "@/core/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_CONFIG.NAME,
  description: APP_CONFIG.DESCRIPTION,
  keywords: ['PASCS', 'dịch vụ công', 'hành chính công'],
  authors: [{ name: 'PASCS Team' }],
  creator: 'PASCS',
  publisher: 'PASCS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: APP_CONFIG.LOGO, sizes: '32x32', type: 'image/png' },
      { url: APP_CONFIG.LOGO, sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: APP_CONFIG.LOGO,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders>
          {children}
          <GlobalToast />
        </AppProviders>
      </body>
    </html>
  );
}
