import { useState } from "react";
import styles from "./ExpenseForm.module.css";

interface ExpenseFormProps {
  onSubmit: (expense: ExpenseData) => void;
}

export interface ExpenseData {
  amount: string;
  category: string;
  purpose: string;
}

const categories = [
  "Groceries",
  "Transportation",
  "Healthcare",
  "Utility",
  "Charity",
  "Miscellaneous",
];

export const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  const [expense, setExpense] = useState<ExpenseData>({
    amount: "",
    category: "Groceries",
    purpose: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(expense);
    setExpense((prev) => ({ ...prev, amount: "", purpose: "" }));
  };

  return (
    <section className={styles.inputSection}>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={expense.amount}
            onChange={(e) =>
              setExpense((prev) => ({ ...prev, amount: e.target.value }))
            }
            required
            step="0.01"
            min="0"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={expense.category}
            onChange={(e) =>
              setExpense((prev) => ({ ...prev, category: e.target.value }))
            }
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="purpose">Purpose</label>
          <input
            type="text"
            id="purpose"
            value={expense.purpose}
            onChange={(e) =>
              setExpense((prev) => ({ ...prev, purpose: e.target.value }))
            }
            required
            placeholder="e.g., Groceries for the week"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Add Expense
        </button>
      </form>
    </section>
  );
};
