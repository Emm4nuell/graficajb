import React from "react";
import "./CustomSelect.css";

type SelectOption = {
  value: string;
  label: string;
};

type SelectType = {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  selectLabel: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function CustomSelect({
  id = "estado",
  label = "Estado",
  options = [],
  value,
  selectLabel,
  onChange,
}: SelectType) {
  return (
    <div className="custom-select">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        <option value="">{selectLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
