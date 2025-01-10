"use client";

import { ExpenseForm } from "@/modules/ExpenseForm/ExpenseForm";
import { ExpenseList } from "@/modules/ExpenseList/ExpenseList";
import styles from "./page.module.css";

export default function ExpensesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.formSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Add New Expense</h2>
            <ExpenseForm />
          </div>
        </div>
        <div className={styles.listSection}>
          <div className={styles.card}>
            <h2 className={styles.title}>Your Expenses</h2>
            <ExpenseList />
          </div>
        </div>
      </div>
    </div>
  );
}
