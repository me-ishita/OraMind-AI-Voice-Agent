// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/app/_context/UserContext";
import ClientLayoutWrapper from "@/app/_components/ClientLayoutWrapper";
import ConvexClientProvider from "@/app/_components/ConvexClientProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "OraMind",
  description: "Speak, Learn, Improve",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>OraMind</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConvexClientProvider>
          <UserProvider>
            <StackProvider app={stackServerApp}>
              <StackTheme>
                <ClientLayoutWrapper>
                  {children}
                  <Toaster />
                </ClientLayoutWrapper>
              </StackTheme>
            </StackProvider>
          </UserProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
