import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { Toaster as Sonner } from "../components/ui/sonner";
import { TooltipProvider } from "../components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: 'YouTube Premium Tracker',
  description:
    'Easily track and manage your YouTube content calendar with powerful user and activity management features.',
  keywords: [
    'YouTube',
    'Tracker',
    'Calendar',
    'User Management',
    'Activity Log'
  ],
  openGraph: {
    title: 'YouTube Premium Tracker',
    description:
      'Easily track and manage your YouTube content calendar with powerful user and activity management features.',
    url: 'https://youtube.pqky.tech',
    siteName: 'YouTube Premium Tracker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YouTube Premium Tracker'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Premium Tracker',
    description:
      'Easily track and manage your YouTube content calendar with powerful user and activity management features.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang='en'>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
