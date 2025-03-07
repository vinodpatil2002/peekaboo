import { ReactNode } from "react";
import type { Metadata } from "next";
import logo from "@/public/icons/logo.svg";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import 'react-datepicker/dist/react-datepicker.css'
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "PEEKABOO",
  description: "Video calling App using Next.js,Typescript and Stream",
  icons: {
    icon: "https://peekaboo-omega.vercel.app/icons/logo.svg", 
  },
  openGraph: {
    title: "PEEKABOO",
    description: "A modern video calling app.",
    url: "https://peekaboo-omega.vercel.app/",
    siteName: "PEEKABOO",
    images: [
      {
        url: "https://peekaboo-omega.vercel.app/images/preview-image.jpg", 
        width: 1200,
        height: 630,
        alt: "PEEKABOO Video Calling App",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/yoom-logo.svg",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          <Toaster />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
