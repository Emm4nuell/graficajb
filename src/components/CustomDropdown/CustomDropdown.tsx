import { Dropdown, DropdownProps } from 'primereact/dropdown';
import './CustomDropdown.css'

interface CustomDropdownProps extends DropdownProps {
  label?: string;
  error?: string;
}

export default function CustomDropdown({
  label,
  error,
  id,
  ...rest
}: CustomDropdownProps) {
  return (
    <div className="custom-dropdown-container">
      {label && (
        <label htmlFor={id} className="custom-dropdown-label">
          {label}
        </label>
      )}
      <Dropdown
        id={id}
        className={`custom-dropdown ${error ? 'custom-dropdown-error' : ''}`}
        {...rest}
      />
      {error && <span className="custom-dropdown-error-message">{error}</span>}
    </div>
  );
}
