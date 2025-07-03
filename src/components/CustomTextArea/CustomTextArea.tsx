import React, { useState } from "react";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import "./CustomTextArea.css";

interface CustomTextAreaProps
  extends Omit<InputTextareaProps, "onChange" | "value"> {
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  value = "",
  onChange,
  error,
  id,
  ...rest
}) => {
  const [touched, setTouched] = useState(false);
  const isEmpty = value === undefined || value === null || value.trim() === "";
  const isInvalid = rest.required && touched && isEmpty;

  return (
    <div className="custom-textarea-container">
      {label && (
        <label className="custom-textarea-container-label" htmlFor={id}>
          {label}
          {rest.required && <span className="required">*</span>}
        </label>
      )}

      <InputTextarea
        id={id}
        value={value}
        onChange={(e) => {
          onChange?.(e);
        }}
        autoResize
        rows={rest.rows || 5}
        cols={rest.cols || 30}
        onBlur={() => setTouched(true)}
        className={`custom-textarea ${
          isInvalid ? "custom-textarea-error" : ""
        }`}
        {...rest}
      />

      {isInvalid && (
        <span className="custom-textarea-error-message">
          {error || "Este campo é obrigatório."}
        </span>
      )}
    </div>
  );
};

export default CustomTextArea;
