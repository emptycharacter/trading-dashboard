// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css"; // Import global styles

export const metadata: Metadata = {
  title: "TradeX - Options Trading Platform",
  description: "Real-time options trading with advanced analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {/* Navbar */}
        <nav className="p-4 bg-blue-600 text-white flex gap-6 fixed w-full top-0 shadow-md">
          <div className="max-w-6xl mx-auto flex w-full justify-between">
            <div className="flex gap-6">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/charts" className="hover:underline">
                Charts
              </Link>
              <Link href="/trade" className="hover:underline">
                Trade
              </Link>
              <Link href="/options-chain" className="hover:underline">
                Options Chain
              </Link>
              <Link href="/settings" className="hover:underline">
                Settings
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="pt-16 p-6 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
