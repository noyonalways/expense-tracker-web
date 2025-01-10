"use client";

import { Spinner } from "@/components/ui/Spinner/Spinner";
import { Category, useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { Expense, useGetExpensesQuery } from "@/redux/services/expenseApi";
import { useGetLimitsQuery } from "@/redux/services/limitApi";
import { Limit } from "@/types/limit";
import { formatCurrency } from "@/utils/format";
import styles from "./LimitList.module.css";

function LimitCard({
  category,
  currentLimit,
  currentSpent,
}: {
  category: string;
  currentLimit?: number;
  currentSpent: number;
}) {
  const percentage = currentLimit
    ? Math.min((currentSpent / currentLimit) * 100, 100)
    : 0;
  const isOverLimit = currentLimit ? currentSpent > currentLimit : false;

  return (
    <div
      className={`${styles.limitCard} ${isOverLimit ? styles.overLimit : ""}`}
    >
      <div className={styles.limitHeader}>
        <h3>{category}</h3>
        {currentLimit ? (
          <span className={styles.limitAmount}>
            Limit: {formatCurrency(currentLimit)}
          </span>
        ) : (
          <span className={styles.noLimit}>No limit set</span>
        )}
      </div>
      <div className={styles.limitInfo}>
        <span className={styles.spent}>
          Spent: {formatCurrency(currentSpent)}
        </span>
        {currentLimit && (
          <>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressFill} ${
                    isOverLimit ? styles.progressOverLimit : ""
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className={styles.progressLabel}>
                {percentage.toFixed(0)}%
              </div>
            </div>
            <span
              className={`${styles.status} ${
                isOverLimit ? styles.exceeded : ""
              }`}
            >
              {isOverLimit ? "Exceeded by:" : "Available:"}{" "}
              {formatCurrency(Math.abs(currentLimit - currentSpent))}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function LimitList() {
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: limits = [], isLoading: limitsLoading } = useGetLimitsQuery();
  const { data: expenses = [], isLoading: expensesLoading } =
    useGetExpensesQuery();

  const isLoading = categoriesLoading || limitsLoading || expensesLoading;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Current Limits</h2>
      <div className={styles.limitsGrid}>
        {categories.map((category: Category) => {
          const limit = limits.find(
            (l: Limit) => l.category._id === category._id
          );
          const categoryExpenses = expenses.filter(
            (expense: Expense) => expense.category._id === category._id
          );
          const currentSpent = categoryExpenses.reduce(
            (total, expense) => total + expense.amount,
            0
          );

          return (
            <LimitCard
              key={category._id}
              category={category.name}
              currentLimit={limit?.amount}
              currentSpent={currentSpent}
            />
          );
        })}
      </div>
    </div>
  );
}
