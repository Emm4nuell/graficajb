import React from "react";
import "./CustomInputText.css";

type TypeInputLabel = {
  id: string;
  type_input: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomInputText({
  id,
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
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
