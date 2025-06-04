import React from "react";
import "./CustomInputText.css";

type TypeInputLabel = {
  type_input: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomInputText({
  type_input,
  label,
  placeholder,
  value,
  onChange,
}: TypeInputLabel) {
  return (
    <div id="custom-input">
      <label htmlFor="input">{label}</label>
      <input
        type={type_input}
        id="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
