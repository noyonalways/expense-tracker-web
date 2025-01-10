import styles from "./Header.module.css";

interface HeaderProps {
  monthlyLimit: number | null;
}

export const Header = ({ monthlyLimit }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>Expense Tracker</h1>
      <div className={styles.limits}>
        <p>Monthly Limit: ${monthlyLimit || 0}</p>
      </div>
    </header>
  );
};
