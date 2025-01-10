import { Expense } from "@/redux/services/expenseApi";

export const formatDate = (
  dateString: string,
  format: "short" | "full" = "short"
): string => {
  const date = new Date(dateString);

  if (format === "full") {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const groupByDate = (expenses: Expense[]): Record<string, Expense[]> => {
  const grouped = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const dateKey = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).toISOString();

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  // Sort dates in descending order
  return Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .reduce((acc, key) => {
      acc[key] = grouped[key].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return acc;
    }, {} as Record<string, Expense[]>);
};
