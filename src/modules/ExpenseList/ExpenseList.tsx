"use client";

import { Spinner } from "@/components/ui/Spinner/Spinner";
import { useGetExpensesQuery } from "@/redux/services/expenseApi";
import { useGetLimitsQuery } from "@/redux/services/limitApi";
import { formatDate, groupByDate } from "@/utils/date";
import { formatCurrency } from "@/utils/format";
import styles from "./ExpenseList.module.css";

interface CategoryTotal {
  spent: number;
  limit?: number;
}

function ProgressBar({ spent, limit }: { spent: number; limit: number }) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOverLimit = spent > limit;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill} ${
            isOverLimit ? styles.progressOverLimit : ""
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={styles.progressLabel}>{percentage.toFixed(0)}%</div>
    </div>
  );
}

export function ExpenseList() {
  const {
    data: expenses = [],
    isLoading: expensesLoading,
    error: expensesError,
  } = useGetExpensesQuery();
  const { data: limits = [], isLoading: limitsLoading } = useGetLimitsQuery();

  const isLoading = expensesLoading || limitsLoading;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  if (expensesError) {
    return <div className={styles.error}>Failed to load expenses</div>;
  }

  if (!expenses.length) {
    return <div className={styles.empty}>No expenses found</div>;
  }

  const groupedExpenses = groupByDate(expenses);

  // Calculate category totals for the current period
  const categoryTotals = expenses.reduce((acc, expense) => {
    const categoryId = expense.category._id;
    if (!acc[categoryId]) {
      acc[categoryId] = { spent: 0 };
      // Find limit for this category
      const limit = limits.find((l) => l.category._id === categoryId);
      if (limit) {
        acc[categoryId].limit = limit.amount;
      }
    }
    acc[categoryId].spent += expense.amount;
    return acc;
  }, {} as Record<string, CategoryTotal>);

  return (
    <div className={styles.container}>
      {Object.entries(groupedExpenses).map(([date, dayExpenses]) => (
        <div key={date} className={styles.dayGroup}>
          <div className={styles.dateHeader}>
            <h3>{formatDate(date, "full")}</h3>
            <span className={styles.dailyTotal}>
              Total:{" "}
              {formatCurrency(
                dayExpenses.reduce((sum, exp) => sum + exp.amount, 0)
              )}
            </span>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.category}>Category</div>
              <div className={styles.purpose}>Purpose</div>
              <div className={styles.amount}>Amount</div>
              <div className={styles.limit}>Limit Status</div>
            </div>
            {dayExpenses.map((expense) => {
              const categoryTotal = categoryTotals[expense.category._id];
              const isOverLimit =
                categoryTotal.limit &&
                categoryTotal.spent > categoryTotal.limit;
              const availableAmount = categoryTotal.limit
                ? categoryTotal.limit - categoryTotal.spent
                : null;

              return (
                <div
                  key={expense._id}
                  className={`${styles.tableRow} ${
                    isOverLimit ? styles.overLimit : ""
                  }`}
                >
                  <div className={styles.category}>{expense.category.name}</div>
                  <div className={styles.purpose}>{expense.purpose}</div>
                  <div className={styles.amount}>
                    {formatCurrency(expense.amount)}
                  </div>
                  <div className={styles.limit}>
                    {categoryTotal.limit ? (
                      <div className={styles.limitInfo}>
                        <span
                          className={`${styles.limitStatus} ${
                            isOverLimit ? styles.exceeded : ""
                          }`}
                        >
                          {isOverLimit ? "Exceeded" : "Available"}:{" "}
                          {formatCurrency(Math.abs(availableAmount!))}
                        </span>
                        <ProgressBar
                          spent={categoryTotal.spent}
                          limit={categoryTotal.limit}
                        />
                        <span className={styles.totalSpent}>
                          ({formatCurrency(categoryTotal.spent)} /{" "}
                          {formatCurrency(categoryTotal.limit)})
                        </span>
                      </div>
                    ) : (
                      <span className={styles.noLimit}>No limit set</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
