import { ReduxProvider } from "@/redux/provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your daily expenses and manage your budget",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" richColors />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
