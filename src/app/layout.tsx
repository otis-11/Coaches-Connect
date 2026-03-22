import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoachConnect — The Professional Network for Coaches",
  description:
    "The career-growth and networking platform built for football and basketball coaches. Build credibility, showcase your coaching tree, and get discovered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] antialiased">{children}</body>
    </html>
  );
}
