import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Snackbar — 맥 메뉴바에 올려두는 간식들",
    template: "%s — Snackbar",
  },
  description:
    "가볍고, 한 입 크기고, 하나씩만 하는 macOS 메뉴바 앱들. One bite, one job.",
  openGraph: {
    title: "Snackbar — 맥 메뉴바에 올려두는 간식들",
    description: "One bite, one job. 가볍고 한 입 크기인 macOS 메뉴바 앱들.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
