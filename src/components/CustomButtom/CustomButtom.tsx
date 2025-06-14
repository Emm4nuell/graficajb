import React from "react";
import "./CustomButtom.css";

type ButtomType = {
  text: string;
  icon?: React.ReactNode;
  textColor?: string;
  color: string;
  onClick: () => void;
};

export default function CustomButtom(child: ButtomType) {
  return (
    <div className="buttom-filter">
      <button
        type="button"
        onClick={child.onClick}
        style={{ backgroundColor: child.color, color: child.text }}
      >
        {child.icon}
        {child.text}
      </button>
    </div>
  );
}
