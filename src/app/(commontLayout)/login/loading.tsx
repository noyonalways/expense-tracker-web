import { Spinner } from "@/components/ui/Spinner";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <Spinner />
    </div>
  );
}
