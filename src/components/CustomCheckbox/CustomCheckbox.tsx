import { Checkbox, CheckboxProps } from 'primereact/checkbox';

interface CustomCheckboxProps extends Omit<CheckboxProps, 'onChange' | 'value'> {
  label?: string;
  options?: { label: string; value: string | number }[];
  multiple?: boolean;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export default function CustomCheckbox({
  label,
  options,
  multiple = false,
  value,
  onChange,
  error,
  ...rest
}: CustomCheckboxProps) {
  const handleChange = (optionValue: any, checked: boolean) => {
    if (multiple) {
      const newValue = checked
        ? [...(value || []), optionValue]
        : (value || []).filter((v: any) => v !== optionValue);
      onChange(newValue);
    } else {
      onChange(checked ? optionValue : null);
    }
  };

  return (
    <div className="custom-checkbox-container">
      {label && <label className="custom-checkbox-label">{label}</label>}

      <div className="flex flex-column gap-2">
        {options?.map((option) => (
          <div key={option.value} className="flex align-items-center gap-2">
            <Checkbox
              inputId={String(option.value)}
              onChange={(e) => handleChange(option.value, e.checked as boolean)}
              {...rest}
            />
            <label htmlFor={String(option.value)}>{option.label}</label>
          </div>
        ))}
      </div>

      {error && <span className="custom-checkbox-error-message">{error}</span>}
    </div>
  );
}
