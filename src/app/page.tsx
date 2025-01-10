"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import {
  ExpenseForm,
  ExpenseData,
} from "../components/ExpenseForm/ExpenseForm";
import { ExpenseSummary } from "../components/ExpenseSummary/ExpenseSummary";
import styles from "./page.module.css";

const categories = [
  "Groceries",
  "Transportation",
  "Healthcare",
  "Utility",
  "Charity",
  "Miscellaneous",
];

export default function Home() {
  const [monthlyLimit, setMonthlyLimit] = useState<number | null>(null);
  const [categoryLimits, setCategoryLimits] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (!monthlyLimit) {
      const limit = prompt("Please set your monthly spending limit:");
      if (limit) {
        setMonthlyLimit(parseFloat(limit));
      }
    }
  }, []);

  const handleExpenseSubmit = async (expense: ExpenseData) => {
    // TODO: Implement expense submission to backend
    console.log("Submitting expense:", expense);
  };

  const handleSetCategoryLimit = (category: string) => {
    const limit = prompt(`Set spending limit for ${category}:`);
    if (limit) {
      setCategoryLimits((prev) => ({
        ...prev,
        [category]: parseFloat(limit),
      }));
    }
  };

  return (
    <div className={styles.container}>
      <Header monthlyLimit={monthlyLimit} />
      <main className={styles.main}>
        <ExpenseForm onSubmit={handleExpenseSubmit} />
        <ExpenseSummary
          categories={categories}
          categoryLimits={categoryLimits}
          onSetLimit={handleSetCategoryLimit}
        />
      </main>
    </div>
  );
}
