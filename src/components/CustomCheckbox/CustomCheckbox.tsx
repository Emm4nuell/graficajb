import { Checkbox, CheckboxProps } from 'primereact/checkbox';
import './CustomCheckbox.css'
interface CustomSingleCheckboxProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export default function CustomCheckbox({
  label,
  checked,
  onChange,
  error,
  id,
  ...rest
}: CustomSingleCheckboxProps) {
  return (
    <div className="custom-checkbox-container">
      <div className="flex align-items-center gap-2">
        <Checkbox
          inputId={id}
          checked={checked}
          onChange={(e) => onChange(e.checked!)}
          {...rest}
        />
      </div>
      {label && (
        <label htmlFor={id} className="custom-checkbox-label">
          {label}
        </label>
      )}
      {error && <span className="custom-checkbox-error-message">{error}</span>}
    </div>
  );
}
