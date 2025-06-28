import { Calendar, CalendarProps } from 'primereact/calendar';
import './CustomCalendar.css'

interface CustomCalendarProps extends CalendarProps {
  label?: string;
  error?: string;
}

export default function CustomCalendar({
  label,
  error,
  id,
  ...rest
}: CustomCalendarProps) {
  return (
    <div className="custom-calendar-container">
      {label && (
        <label htmlFor={id} className="custom-calendar-label">
          {label}
        </label>
      )}
      <Calendar
        id={id}
        className={`custom-calendar ${error ? 'custom-calendar-error' : ''}`}
        {...rest}
      />
      {error && <span className="custom-calendar-error-message">{error}</span>}
    </div>
  );
}
