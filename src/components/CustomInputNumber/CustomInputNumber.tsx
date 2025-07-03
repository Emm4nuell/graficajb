import React, { useState } from "react";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import "./CustomInputNumber.css";

interface CustomInputNumberProps extends InputNumberProps {
  label?: string;
  error?: string;
  required?: boolean;
}

export default function CustomInputNumber({
  id,
  label,
  error,
  required,
  onBlur,
  value,
  ...rest
}: CustomInputNumberProps) {
  const [touched, setTouched] = useState(false);

  const isEmpty =
    value === null ||
    value === undefined

  const isInvalid = required && touched && isEmpty;

  console.log(isInvalid, required, touched, isEmpty)

  return (
    <div className="custom-input-number-container">
      {label && (
        <label htmlFor={id} className="custom-input-number-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <InputNumber
        id={id}
        value={value}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        className={`custom-input-number ${
          isInvalid ? "custom-input-number-error" : ""
        }`}
        mode="currency"
        currency="BRL"
        locale="pt-BR"
        {...rest}
      />
      {isInvalid && (
        <span className="custom-input-number-error-message">
          {error ? error : "Este campo é obrigatório."}
        </span>
      )}
    </div>
  );
}
