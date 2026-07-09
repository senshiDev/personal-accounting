import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers/Providers"

// تعریف فونت وزیرمتن
const vazirMatn = localFont({
  src: [
    {
      path: "../public/fonts/Vazirmatn-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazirmatn-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazir", // متغیر سفارشی برای استفاده در CSS
});

export const metadata: Metadata = {
  title: "حساب شخصی",
  description: "تولید شده توسط اپلیکیشن نکست",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="fa"
  dir="rtl"
  className={cn("h-full antialiased", vazirMatn.className)}
>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}