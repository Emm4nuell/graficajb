import React from "react";
import "./CustomInputSelect.css";

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

export default function CustomInputSelect({
  id = "id",
  label = "label",
  options = [],
  value,
  selectLabel,
  onChange,
}: SelectType) {
  return (
    <div className="custom-select-input">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}   style={{
          color: value == ""? "#757575" : "#fff"
        }}>
        <option value="" disabled>{selectLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
