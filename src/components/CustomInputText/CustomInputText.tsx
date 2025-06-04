import React from "react";
import "./CustomInputText.css";

type TypeInputLabel = {
  type_input: string;
  label: string;
  placeholder: string;
};

export default function CustomInputText({
  type_input,
  label,
  placeholder,
}: TypeInputLabel) {
  return (
    <div id="custom-input">
      <label htmlFor="input">{label}</label>
      <input type={type_input} id="input" placeholder={placeholder} />
    </div>
  );
}
