import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ServiceWorkerRegistration } from "@/contexts/ServiceWorkerRegistration";
import { QueryProvider } from "@/providers/QueryProviders";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FlowStack",
  description:
    "a collaborative project management platform where teams plan, assign, and complete tasks in real time. Organize projects, manage permissions, and keep your workflow in sync — all in one sleek, dark interface.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/icons/android/android-launchericon-192-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/android/android-launchericon-512-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/icons/ios/180.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <AuthProvider>
              <ServiceWorkerRegistration />
              <SidebarProvider>
                <Toaster richColors position="top-right" />
                <>{children}</>
              </SidebarProvider>{" "}
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
