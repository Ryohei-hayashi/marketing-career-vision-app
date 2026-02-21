import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "マーケティング診断 - Will から逆算",
  description: "将来どうありたいかを定義し、目標到達に必要なミッシングピースを特定するキャリアサポートアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-blue-600">Career Vision</a>
            <nav className="flex gap-4 text-sm text-gray-600">
              <a href="/diagnosis" className="hover:text-blue-600 transition-colors">診断を始める</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50 mt-16">
          <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-gray-500">
            Career Vision App - キャリアビジョン診断
          </div>
        </footer>
      </body>
    </html>
  );
}
