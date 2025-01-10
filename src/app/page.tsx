"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Take Control of Your{" "}
            <span className={styles.highlight}>Finances</span>
          </h1>
          <p className={styles.subtitle}>
            Track expenses, set budgets, and achieve your financial goals with
            our easy-to-use expense tracker
          </p>
          <div className={styles.cta}>
            <button
              onClick={() => router.push("/register")}
              className={styles.primaryButton}
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("/login")}
              className={styles.secondaryButton}
            >
              Login
            </button>
          </div>
        </div>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Track Expenses</h3>
            <p>Monitor your spending habits with detailed expense tracking</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Set Limits</h3>
            <p>Create spending limits for different expense categories</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📈</div>
            <h3>View Analytics</h3>
            <p>Get insights into your spending patterns</p>
          </div>
        </div>
      </section>
    </div>
  );
}
