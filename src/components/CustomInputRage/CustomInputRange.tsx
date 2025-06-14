import React, { useState, useEffect, useRef } from "react";
import "./CustomInputRange.css";

export default function CustomInputRange() {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  // refs para pegar a largura do container para calcular o intervalo em px
  const slidersRef = useRef(null);
  const [trackStyle, setTrackStyle] = useState({ left: "0%", width: "60%" });

  // Atualiza o estilo da faixa azul quando min ou max mudam
  useEffect(() => {
    if (!slidersRef.current) return;

    const totalWidth = slidersRef.current.offsetWidth;

    const leftPercent = (min / 100) * totalWidth;
    const rightPercent = (max / 100) * totalWidth;
    const widthPercent = rightPercent - leftPercent;

    setTrackStyle({
      left: `${min}%`,
      width: `${max - min}%`,
    });
  }, [min, max]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), max - 1);
    setMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), min + 1);
    setMax(value);
  };

  return (
    <div className="range-container">
      <label>Faixa salarial</label>
      <div className="sliders" ref={slidersRef}>
        <div className="track-selected" style={trackStyle} />
        <input
          type="range"
          min="0"
          max="100"
          value={min}
          onChange={handleMinChange}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={max}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}
