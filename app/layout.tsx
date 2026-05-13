import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import SiteFooter from "./components/site-footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRMS | Company Resource Management System",
  description:
    "A demo platform by Zyverra Labs to manage employees, documents, and approvals with role-based access control.",
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Providers />
      </body>
    </html>
  );
}
