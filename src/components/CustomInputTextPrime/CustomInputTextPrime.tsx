import { InputText, InputTextProps } from 'primereact/inputtext';
import './CustomInputTextPrime.css';

interface CustomInputTextPrimeProps extends InputTextProps {
  label?: string;
  error?: string;
}

export default function CustomInputTextPrime({
  label,
  error,
  id,
  ...rest
}: CustomInputTextPrimeProps) {
  return (
    <div className="custom-input-container">
      {label && (
        <label htmlFor={id} className="custom-input-label">
          {label}
        </label>
      )}
      <InputText id={id} className={`custom-input ${error ? 'custom-input-error' : ''}`} {...rest} />
      {error && <span className="custom-input-error-message">{error}</span>}
    </div>
  );
}
