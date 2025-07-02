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
  value: propValue = "",
  onChange,
  error,
  id,
  ...rest
}) => {
  const [value, setValue] = useState<string>(propValue);
  const [touched, setTouched] = useState(false);
  const isInvalid = rest.required && touched && !value;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

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
        onChange={handleChange}
        autoResize
        rows={rest.rows || 5}
        cols={rest.cols || 30}
        onBlur={(e) => {
          setTouched(true);
        }}
        className={`custom-textarea ${
          isInvalid ? "custom-textarea-error" : ""
        }`}
        {...rest}
      />

      {isInvalid && (
        <span className="custom-textarea-error-message">
          {isInvalid ? error : "Este campo é obrigatório."}
        </span>
      )}
    </div>
  );
};

export default CustomTextArea;
