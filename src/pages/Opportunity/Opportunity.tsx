import { useEffect, useState } from "react";
import "./Opportunity.css";
import CardOpportunity from "../../components/card/cardOpportunity/CardOpportunity";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CustomInputTextPrime from "../../components/CustomInputTextPrime/CustomInputTextPrime";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import { FaFilter } from "react-icons/fa6";
import {
  defaultOpportunitie,
  OpportunitieType,
} from "../../types/OpportunitiesType";
import Header from "../../components/Header/Header";
import { useLocalidade } from "../../hooks/userLocalidades";
import { opportunityService } from "../../services/opportunityService";
import { useNavigate } from "react-router-dom";
import { CustomFilter, defaultCustomerFilter } from "../../types/FilterType";
import { keyof } from "zod/v4";

export default function OpportunityPage() {
  const navigator = useNavigate();
  const [filter, setFilter] = useState<CustomFilter>(defaultCustomerFilter);
  const { estados, cidades, buscarEstados } = useLocalidade();
  const [opportunities, setOpportunities] = useState<OpportunitieType[]>([
    defaultOpportunitie,
  ]);

  const fetchOpportunities = async () => {
    try {
      const data = await opportunityService(
        localStorage.getItem("token"),
        filter
      );
      setOpportunities(data);
    } catch (error) {
      if (error.message.includes("401")) {
        localStorage.removeItem("token");
        navigator("/signin");
      }
    }
  };

  useEffect(() => {
    fetchOpportunities();
    buscarEstados();
  }, []);

  const selectEstado = (value: string) => {
    buscarEstados(value);
    setFilter((prev) => ({ ...prev, uf: value }));
  };

  const onchangerInput = (field: keyof CustomFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Header />
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
                  title={value.titulo}
                  subtitle={`${value.endereco.cidade} - ${value.endereco.uf}`}
                  topic={[value.regimeTrabalho]}
                  date={"Postada há 5 dias"}
                />
              ))}
            </div>
            <div className="filter">
              <h1 id="title">Filtros rápidos</h1>
              <h2>Modelo de trabalho</h2>
              <CustomInputTextPrime
                label="Título"
                placeholder="Ex. Desenvolvedor"
                onChange={(e) => onchangerInput("titulo", e.target.value)}
              />
              <CustomInputTextPrime
                label="Cargo"
                placeholder="Ex. Desenvolvedor"
                onChange={(e) => onchangerInput("cargo", e.target.value)}
              />
              <h2>Local de trabalho</h2>
              <div className="select">
                <CustomSelect
                  id="1"
                  label="Estado"
                  value={filter.uf}
                  selectLabel="Selecione o estado"
                  onChange={(e) => {
                    selectEstado(e.target.value);
                  }}
                  options={estados}
                />
                <CustomSelect
                  id="2"
                  label="Cidade"
                  value={filter.localidade}
                  selectLabel="Selecione a cidade"
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      localidade: e.target.value,
                    }));
                  }}
                  options={cidades}
                />
              </div>
              <h2>Dados da vaga</h2>
              <div className="select">
                <CustomSelect
                  id="1"
                  label="Regime de Trabalho"
                  value={filter.regimeTrabalho}
                  selectLabel="Selecione"
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      regimeTrabalho: e.target.value,
                    }));
                  }}
                  options={[
                    { id: 1, nome: "Presencial" },
                    { id: 2, nome: "Híbrido" },
                    { id: 3, nome: "Remoto" },
                  ]}
                />
                <CustomSelect
                  id="1"
                  label="Tipo de contratação"
                  value={filter.tipoContratacao}
                  selectLabel="Selecione"
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      tipoContratacao: e.target.value,
                    }));
                  }}
                  options={[
                    { id: 1, nome: "PJ" },
                    { id: 2, nome: "PF" },
                  ]}
                />
              </div>
              <CustomButtom
                text="Filtrar"
                icon={<FaFilter />}
                color="#2c2c2c"
                onClick={() => {
                  fetchOpportunities();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
