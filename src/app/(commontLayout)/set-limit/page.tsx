import { LimitList } from "@/modules/LimitList/LimitList";
import { SetLimitForm } from "@/modules/SetLimitForm/SetLimitForm";
import styles from "./page.module.css";

export default function SetLimitPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <SetLimitForm />
      </div>
      <div className={styles.listSection}>
        <LimitList />
      </div>
    </div>
  );
}
