import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material";
import localFont from "next/font/local";
import "./globals.css";
import theme from "@/components/common/themes/theme";
import ToastProvider from "@/providers/toast/ToastProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Suspense } from "react";
import Loading from "@/components/common/loading/Loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next.js Web/App",
  description: "The web built by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          <AppRouterCacheProvider>
            <ReduxProvider>
              <ThemeProvider theme={theme}>
                <ToastProvider>{children}</ToastProvider>
              </ThemeProvider>
            </ReduxProvider>
          </AppRouterCacheProvider>
        </Suspense>
      </body>
    </html>
  );
}
