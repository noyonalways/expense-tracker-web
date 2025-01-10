import { CategoryLimits } from "../CategoryLimits/CategoryLimits";
import styles from "./ExpenseSummary.module.css";

interface ExpenseSummaryProps {
  categories: string[];
  categoryLimits: { [key: string]: number };
  onSetLimit: (category: string) => void;
}

export const ExpenseSummary = ({
  categories,
  categoryLimits,
  onSetLimit,
}: ExpenseSummaryProps) => {
  return (
    <section className={styles.summarySection}>
      <h2>Expense Summary</h2>
      <CategoryLimits
        categories={categories}
        categoryLimits={categoryLimits}
        onSetLimit={onSetLimit}
      />
      <div className={styles.expenseList}>
        {/* Expense list will be populated from the backend */}
      </div>
    </section>
  );
};
