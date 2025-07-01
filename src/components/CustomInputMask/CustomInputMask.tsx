import { InputMask, InputMaskProps } from "primereact/inputmask";
import "./CustomInputMask.css";

interface CustomInputMaskProps extends Omit<InputMaskProps, "onChange" | "value"> {
  id?: string;
  label?: string;
  error?: string;
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  mask?: string; 
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
  type,
  ...rest
}: CustomInputMaskProps) {
  return (
    <div className="custom-input-container">
      {label && (
        <label htmlFor={id} className="custom-input-label">
          {label}
        </label>
      )}

      <InputMask
        id={id}
        mask={mask}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue?.(e.value ?? "")}
        className={`custom-input ${error ? "custom-input-error" : ""}`}
        {...rest}
      />

      {error && <span className="custom-input-error-message">{error}</span>}
    </div>
  );
}
