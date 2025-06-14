import React, { useState } from "react";
import "./Opportunity.css";
import CardOpportunity from "../../components/card/cardOpportunity/CardOpportunity";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CardFilter from "../../components/card/CardFilter/CardFilter";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import { FaFilter } from "react-icons/fa6";
import { OpportunitieType } from "../../types/OpportunitiesType";

const listOpportunities = [
  {
    title: "Senior Java Developer",
    subtitle: "João Pessoa - PB",
    topic: ["Presencial", "Efetivo"],
    date: "Postada há 2 dias",
  },
  {
    title: "Front-end React Developer",
    subtitle: "Campina Grande - PB",
    topic: ["Remoto", "Contrato"],
    date: "Postada há 5 dias",
  },
  {
    title: "Fullstack Developer (Node.js + React)",
    subtitle: "Recife - PE",
    topic: ["Híbrido", "Efetivo"],
    date: "Postada há 1 dia",
  },
  {
    title: "DevOps Engineer",
    subtitle: "Natal - RN",
    topic: ["Presencial", "CLT"],
    date: "Postada há 3 dias",
  },
  {
    title: "Backend Python Developer",
    subtitle: "Fortaleza - CE",
    topic: ["Remoto", "PJ"],
    date: "Postada há 7 dias",
  },
  {
    title: "QA Automation Engineer",
    subtitle: "João Pessoa - PB",
    topic: ["Híbrido", "Efetivo"],
    date: "Postada há 4 dias",
  },
];

export default function OpportunityPage() {
  const [cardFilter, setCardFilter] = useState<boolean>(false);
  const [opportunities, setOpportunities] =
    useState<OpportunitieType[]>(listOpportunities);

  const visible = () => {
    setCardFilter(!cardFilter);
    console.log("Botao visible acionado! ", cardFilter);
  };

  return (
    <div className="opportunity-body">
      <div className="opportunities">
        <div id="title">
          <h1>Oportunidades</h1>
          <span>{opportunities.length} vaga(s) encontrada(s)</span>
        </div>
        <div className="div-opportunities">
          <div className="list-opportunities">
            {opportunities.map((value, index) => (
              <CardOpportunity
                key={index}
                title={value.title}
                subtitle={value.subtitle}
                topic={value.topic}
                date={value.date}
              />
            ))}
          </div>
          <div className="filter">
            <h1 id="title">Filtros rápidos</h1>
            <h2>Modelo de trabalho</h2>
            <div className="checkbox">
              <input type="checkbox" />
              <span>Presencial</span>
            </div>
            <div className="checkbox">
              <input type="checkbox" />
              <span>Híbrido</span>
            </div>
            <div className="checkbox">
              <input type="checkbox" />
              <span>Remoto</span>
            </div>
            <h2>Local de trabalho</h2>
            <div className="select">
              <CustomSelect
                id="1"
                label="Estado"
                value={"estado"}
                selectLabel="Selecione o estado"
                onChange={(e) => {}}
                options={[
                  { value: "pb", label: "Paraíba" },
                  { value: "pe", label: "Pernambuco" },
                  { value: "rn", label: "Rio Grande do Norte" },
                ]}
              />
              <CustomSelect
                id="2"
                label="Cidade"
                value={"Cidade"}
                selectLabel="Selecione a cidade"
                onChange={(e) => {}}
                options={[
                  { value: "pb", label: "Paraíba" },
                  { value: "pe", label: "Pernambuco" },
                  { value: "rn", label: "Rio Grande do Norte" },
                ]}
              />
            </div>
            <h2>Dados da vaga</h2>
            <div className="select">
              <CustomSelect
                id="1"
                label="Estado"
                value={"estado"}
                selectLabel="Tipo da vaga"
                onChange={(e) => {}}
                options={[
                  { value: "pb", label: "Paraíba" },
                  { value: "pe", label: "Pernambuco" },
                  { value: "rn", label: "Rio Grande do Norte" },
                ]}
              />
              <CustomSelect
                id="1"
                label="Estado"
                value={"estado"}
                selectLabel="Elegível para PCD?"
                onChange={(e) => {}}
                options={[
                  { value: "sim", label: "Sim" },
                  { value: "nao", label: "Não" },
                ]}
              />
            </div>
            <CustomButtom
              text="Outros Filtros"
              icon={<FaFilter />}
              color="#2c2c2c"
              onClick={() => visible()}
            />
          </div>
        </div>

        {cardFilter && (
          <div className="card-absolute">
            <CardFilter visible={visible} />
          </div>
        )}
      </div>
    </div>
  );
}
