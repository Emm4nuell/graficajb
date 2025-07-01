import React, { useState } from "react";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";

interface CustomTextAreaProps extends Omit<InputTextareaProps, "onChange" | "value"> {
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="custom-textarea-container" style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
      {label && (
        <label htmlFor={id} style={{ fontWeight: 500, fontSize: ".9rem", color: "#334155" }}>
          {label}
        </label>
      )}

      <InputTextarea
        id={id}
        value={value}
        onChange={handleChange}
        autoResize
        rows={rest.rows || 5}
        cols={rest.cols || 30}
        className={`custom-textarea ${error ? "custom-textarea-error" : ""}`}
        style={{
          fontSize: ".8rem",
          width: "100%",
          padding: "0.75rem",
          borderRadius: "0.5rem",
          border: error ? "1px solid #ef4444" : "1px solid #cbd5e1",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        {...rest}
      />

      {error && (
        <span style={{ color: "#ef4444", fontSize: ".75rem" }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomTextArea;
