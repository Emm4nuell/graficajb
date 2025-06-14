import React, { useState } from "react";
import "./CardFilter.css";
import CustomSelect from "../../CustomSelect/CustomSelect";
import CustomInputRange from "../../CustomInputRage/CustomInputRange";
import ButtomFilter from "../../CustomButtom/CustomButtom";
import { FaFilter } from "react-icons/fa6";

type CardFilterType = {
  visible: () => void;
};

export default function CardFilter(child: CardFilterType) {
  const [value, setValue] = useState<number[]>([20, 80]);

  const visible = () => {
    child.visible();
  };
  return (
    <div className="card-filter">
      <h1>Outros filtros</h1>
      <CustomSelect
        id="1"
        label="Senioridade"
        value={"senioridade"}
        selectLabel="Selecione uma senioridade"
        onChange={(e) => {}}
        options={[
          { value: "pb", label: "Paraíba" },
          { value: "pe", label: "Pernambuco" },
          { value: "rn", label: "Rio Grande do Norte" },
        ]}
      />
      <CustomSelect
        id="2"
        label="Modalidade de contratação"
        value={"contratacao"}
        selectLabel="Selecione uma modalidade"
        onChange={(e) => {}}
        options={[
          { value: "pb", label: "Paraíba" },
          { value: "pe", label: "Pernambuco" },
          { value: "rn", label: "Rio Grande do Norte" },
        ]}
      />
      <CustomInputRange />
      <CustomSelect
        id="3"
        label="Área de atuação"
        value={"atuacao"}
        selectLabel="Selecione uma área "
        onChange={(e) => {}}
        options={[
          { value: "pb", label: "Paraíba" },
          { value: "pe", label: "Pernambuco" },
          { value: "rn", label: "Rio Grande do Norte" },
        ]}
      />
      <CustomSelect
        id="4"
        label="Benefícios"
        value={"beneficios"}
        selectLabel="Selecione um benefício"
        onChange={(e) => {}}
        options={[
          { value: "pb", label: "Paraíba" },
          { value: "pe", label: "Pernambuco" },
          { value: "rn", label: "Rio Grande do Norte" },
        ]}
      />
      <CustomSelect
        id="5"
        label="Vaga afirmativa"
        value={"vaga"}
        selectLabel="Selecione um tipo"
        onChange={(e) => {}}
        options={[
          { value: "pb", label: "Paraíba" },
          { value: "pe", label: "Pernambuco" },
          { value: "rn", label: "Rio Grande do Norte" },
        ]}
      />
      <div className="card-filter-button">
        <ButtomFilter
          text="Cancelar"
          textColor="#616161"
          color="#C4C4C4"
          onClick={() => visible()}
        />

        <ButtomFilter
          text="Filtrar"
          icon={<FaFilter />}
          color="#2c2c2c"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
