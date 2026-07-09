import { FieldErrors, FieldError } from 'react-hook-form';

interface ErrorMessagesProps<T> {
  errors: FieldErrors;
  fieldName: keyof T;
}

function FormErrorBox<T>({ errors, fieldName }: ErrorMessagesProps<T>) {
  // خطا را از errors بر اساس نام فیلد می‌گیریم
  const error = errors[fieldName] as FieldError | undefined;

  if (!error || !error.message) return null;

  return (
    <p className="text-red-600 text-sm mt-1">
      {error.message}
    </p>
  );
}

export default FormErrorBox;
