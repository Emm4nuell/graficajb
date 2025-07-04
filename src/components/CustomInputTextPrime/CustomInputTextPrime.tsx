import { InputText, InputTextProps } from "primereact/inputtext";
import "./CustomInputTextPrime.css";
import { useState } from "react";
interface CustomInputTextPrimeProps extends InputTextProps {
  label?: string;
  error?: string;
  type?: string;
  required?: boolean;
}

export default function CustomInputTextPrime({
  label,
  error,
  id,
  type,
  required,
  onBlur,
  ...rest
}: CustomInputTextPrimeProps) {
  const [touched, setTouched] = useState(false);
  const isInvalid = required && (touched && !rest.value);

  return (
    <div className="custom-input-text-prime-container">
      {label && (
        <label htmlFor={id} className="custom-input-text-prime-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <InputText
        id={id}
        type={type}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        className={`custom-input-text-prime ${isInvalid ? "custom-input-text-prime-error" : ""}`}
        {...rest}
      />
      {isInvalid && (
        <span className="custom-input-text-prime-error-message">
          {isInvalid ? error : "Este campo é obrigatório."}
        </span>
      )}
    </div>
  );
}
