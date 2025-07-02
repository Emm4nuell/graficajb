import { Dropdown, DropdownProps } from "primereact/dropdown";
import "./CustomDropdown.css";
import { useState } from "react";

interface CustomDropdownProps extends DropdownProps {
  label?: string;
  error?: string;
}

export default function CustomDropdown({
  label,
  error,
  id,
  onBlur,
  ...rest
}: CustomDropdownProps) {
  const [touched, setTouched] = useState(false);
  const isInvalid =
    rest.required &&
    touched &&
    (rest.value === null || rest.value === undefined || rest.value === 0);

  return (
    <div className="custom-dropdown-container">
      {label && (
        <label htmlFor={id} className="custom-dropdown-label">
          {label}
          {rest.required && <span className="required">*</span>}
        </label>
      )}
      <Dropdown
        id={id}
        className={`custom-dropdown ${
          isInvalid ? "custom-dropdown-error" : ""
        }`}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        {...rest}
      />
      {isInvalid && (
        <span className="custom-dropdown-error-message">
          {isInvalid ? error : "Este campo é obrigatório."}
        </span>
      )}
    </div>
  );
}
