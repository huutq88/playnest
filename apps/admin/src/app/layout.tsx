import type { Metadata } from "next";
import "./globals.css";
import { SidebarNav } from "@/components/SidebarNav";

export const metadata: Metadata = {
  title: "PlayNest Admin CMS - Entertainment Hub Management",
  description: "Quản trị hệ thống PlayNest Platform: Social Videos, App Showcase & Web Games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen bg-[#090d16] text-gray-100 antialiased">
        <SidebarNav />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
