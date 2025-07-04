import { Calendar, CalendarProps } from 'primereact/calendar';
import './CustomCalendar.css'
import { useState } from 'react';

interface CustomCalendarProps extends CalendarProps {
  label?: string;
  error?: string;
}

export default function CustomCalendar({
  label,
  error,
  id,
  disabled,
  ...rest
}: CustomCalendarProps) {

  const [touched, setTouched] = useState(false);
  const isInvalid = rest.required && (touched && !rest.value);

  return (
    <div className="custom-calendar-container">
      {label && (
        <label htmlFor={id} className="custom-calendar-label">
          {label}
          {rest.required && <span className="required">*</span>}
        </label>
      )}
      <Calendar
        id={id}
        dateFormat="dd/mm/yy"
        locale="pt-BR"
        className={`custom-calendar ${isInvalid ? 'custom-calendar-error' : ''}`}
        disabled={disabled}
        {...rest}
      />
      {isInvalid && <span className="custom-calendar-error-message">{isInvalid ? error : "Este campo é obrigatório."}</span>}
    </div>
  );
}
