import { Navigation } from "@/components/Navigation/Navigation";
import type { Metadata } from "next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and set spending limits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className={styles.main}>{children}</main>
    </>
  );
}
