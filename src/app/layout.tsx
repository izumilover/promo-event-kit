/**
 * @file layout.tsx
 * @description 루트 레이아웃 — 폰트 변수, 전역 메타데이터
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";
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
  title: "기획전·이벤트 모듈 카탈로그",
  description: "JSON 설정으로 조립하는 기획전/이벤트 공통 모듈 데모",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
