import { InputMask, InputMaskProps } from "primereact/inputmask";
import "./CustomInputMask.css";
import { useState } from "react";

interface CustomInputMaskProps
  extends Omit<InputMaskProps, "onChange" | "value"> {
  id?: string;
  label?: string;
  error?: string;
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  mask?: string;
  required?: boolean;
  type: string;
}

export default function CustomInputMask({
  id,
  label,
  error,
  value,
  setValue,
  placeholder,
  mask,
  required,
  type,
  onBlur,
  ...rest
}: CustomInputMaskProps) {
  const [touched, setTouched] = useState(false);
  const isInvalid = required && (touched && !value);
  console.log(error)
  return (
    <div className="custom-input-mask-container">
      {label && (
        <label htmlFor={id} className="custom-input-mask-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <InputMask
        id={id}
        mask={mask}
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        onChange={(e) => setValue?.(e.value ?? "")}
        className={`custom-input-mask ${isInvalid ? "custom-input-mask-error" : ""}`}
        {...rest}
      />

      {isInvalid && (
        <span className="custom-input-mask-error-message">
          {error ? error : "Este campo é obrigatório."}
        </span>
      )}
    </div>
  );
}
