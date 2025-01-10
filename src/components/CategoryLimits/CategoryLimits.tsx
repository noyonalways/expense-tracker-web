import styles from "./CategoryLimits.module.css";

interface CategoryLimitsProps {
  categories: string[];
  categoryLimits: { [key: string]: number };
  onSetLimit: (category: string) => void;
}

export const CategoryLimits = ({
  categories,
  categoryLimits,
  onSetLimit,
}: CategoryLimitsProps) => {
  return (
    <div className={styles.categoryLimits}>
      {categories.map((category) => (
        <div key={category} className={styles.categoryLimit}>
          <span>{category}</span>
          <span>
            Limit: ${categoryLimits[category] || 0}
            <button
              onClick={() => onSetLimit(category)}
              className={styles.setLimitButton}
            >
              Set Limit
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};
