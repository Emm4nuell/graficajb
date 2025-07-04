import { useEffect, useState } from "react";
import "./Opportunity.css";
import CardOpportunity from "../../components/card/cardOpportunity/CardOpportunity";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CardFilter from "../../components/card/CardFilter/CardFilter";
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

export default function OpportunityPage() {
  const navigator = useNavigate();
  const { estados, cidades, buscarEstados } = useLocalidade();
  const [cardFilter, setCardFilter] = useState<boolean>(false);
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [contratacao, setContratacao] = useState("");
  const [regime, setRegime] = useState("");
  const [opportunities, setOpportunities] = useState<OpportunitieType[]>([
    defaultOpportunitie,
  ]);

  const visible = () => {
    setCardFilter(!cardFilter);
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await opportunityService(localStorage.getItem("token"));
        setOpportunities(data);
      } catch (error) {
        if (error.message.includes("401")) {
          localStorage.removeItem("token");
          navigator("/signin");
        }
      }
    };

    fetchOpportunities();
  }, []);

  const selectEstado = (value: string) => {
    buscarEstados(value);
    console.warn(cidades);
    setEstado(value);
  };

  const selectCidade = (value: string) => {
    console.warn(cidades);
    setCidade(value);
  };

  useEffect(() => {
    buscarEstados();
    console.error(estados);
  }, []);

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
                  value={estado}
                  selectLabel="Selecione o estado"
                  onChange={(e) => {
                    selectEstado(e.target.value);
                  }}
                  options={estados}
                />
                <CustomSelect
                  id="2"
                  label="Cidade"
                  value={cidade}
                  selectLabel="Selecione a cidade"
                  onChange={(e) => {
                    setCidade(e.target.value);
                  }}
                  options={cidades}
                />
              </div>
              <h2>Dados da vaga</h2>
              <div className="select">
                <CustomSelect
                  id="1"
                  label="Regime de Trabalho"
                  value={regime}
                  selectLabel="Selecione"
                  onChange={(e) => {
                    setRegime(e.target.value);
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
                  value={contratacao}
                  selectLabel="Selecione"
                  onChange={(e) => {
                    setContratacao(e.target.value);
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
    </>
  );
}
