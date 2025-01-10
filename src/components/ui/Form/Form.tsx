import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import styles from "./Form.module.css";

interface FormField {
  name: string;
  label: string;
  type: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  fields: FormField[];
  submitText: string;
  isSubmitting?: boolean;
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  fields,
  submitText,
  isSubmitting,
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {fields.map((field) => (
        <div key={field.name} className={styles.formGroup}>
          <label htmlFor={field.name} className={styles.label}>
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              id={field.name}
              className={styles.select}
              {...register(field.name as Path<T>)}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              className={styles.input}
              {...register(field.name as Path<T>)}
            />
          )}
          {errors[field.name] && (
            <span className={styles.errorMessage}>
              {errors[field.name]?.message as string}
            </span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {submitText}
      </button>
    </form>
  );
}
