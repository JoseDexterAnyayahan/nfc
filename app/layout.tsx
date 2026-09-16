import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DexTap",
  description: "Created by DexTap — digital business cards made simple.",
  applicationName: "DexTap",
  generator: "DexTap",
  authors: [
    {
      name: "DexTap",
    },
  ],
  creator: "DexTap",
  publisher: "DexTap",

  icons: {
    icon: [
      {
        url: "/dextap-logo.png",
        type: "image/png",
      },
    ],
    shortcut: "/dextap-logo.png",
    apple: "/dextap-logo.png",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}