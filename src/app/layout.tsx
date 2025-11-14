import type { Metadata } from "next";
import Providers from "@/components/providers/query-client-provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SidebarProvider } from "@/context/sidebar-context";
import { ToastProvider } from "@/hooks/use-toast";

export const metadata: Metadata = {
  title: "PhishSheriff",
  description: "Cyber Awareness Platform",
  icons: {
    icon: "/phish-sheriff-small.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="antialiased"
      >
        <ToastProvider>
          <Providers>
            <SidebarProvider>
              {children}
            </SidebarProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
              }}
            />
          </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
