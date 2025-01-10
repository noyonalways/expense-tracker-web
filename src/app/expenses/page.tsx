"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface Expense {
  id: string;
  amount: number;
  category: string;
  purpose: string;
  date: string;
}

export default function ExpensesPage() {
  // TODO: Replace with actual data from backend
  const [expenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 50.25,
      category: "Groceries",
      purpose: "Weekly groceries",
      date: "2024-01-10",
    },
    {
      id: "2",
      amount: 25.0,
      category: "Transportation",
      purpose: "Bus fare",
      date: "2024-01-10",
    },
  ]);

  const groupExpensesByDate = (expenses: Expense[]) => {
    return expenses.reduce((groups, expense) => {
      const date = expense.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
      return groups;
    }, {} as { [key: string]: Expense[] });
  };

  const groupedExpenses = groupExpensesByDate(expenses);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>All Expenses</h1>
        {Object.entries(groupedExpenses).map(([date, expenses]) => (
          <div key={date} className={styles.dateGroup}>
            <h2>{new Date(date).toLocaleDateString()}</h2>
            <div className={styles.expenseList}>
              {expenses.map((expense) => (
                <div key={expense.id} className={styles.expenseCard}>
                  <div className={styles.expenseHeader}>
                    <span className={styles.category}>{expense.category}</span>
                    <span className={styles.amount}>
                      ${expense.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className={styles.purpose}>{expense.purpose}</p>
                </div>
              ))}
              <div className={styles.dailyTotal}>
                <strong>Daily Total:</strong> $
                {expenses
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
