import "./MyApplications.css";
import Header from "../../components/Header/Header";
import { opportunityService } from "../../services/opportunityService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomFilter, defaultCustomerFilter } from "../../types/FilterType";
import { useLocalidade } from "../../hooks/userLocalidades";
import {
  defaultOpportunitie,
  OpportunitieType,
} from "../../types/OpportunitiesType";
import { useAuth } from "../../contexts/AuthContext";
import CardOpportunity from "../../components/card/cardOpportunity/CardOpportunity";
import CustomInputTextPrime from "../../components/CustomInputTextPrime/CustomInputTextPrime";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import { FaFilter } from "react-icons/fa6";
import { myApplicationsService } from "../../services/getMyApplicationsService";

export default function MyApplications() {
  const navigator = useNavigate();
  const [filter, setFilter] = useState<CustomFilter>(defaultCustomerFilter);
  const { estados, cidades, buscarEstados } = useLocalidade();
  const [opportunities, setOpportunities] = useState<OpportunitieType[]>([
    defaultOpportunitie,
  ]);
  const { user, token } = useAuth();

  const fetchApplications = async () => {
    try {
      const data = await myApplicationsService(token, user?.id || "");

      if (data.length === 0) {
        toast.error("Nenhuma vaga encontrada com os filtros selecionados.");
      } else {
        setOpportunities(data);
        console.log(opportunities);
      }
    } catch (error) {
      if (error.message.includes("401")) {
        localStorage.removeItem("token");
        navigator("/signin");
      }
    }
  };

  useEffect(() => {
    fetchApplications();
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
        <div className="my-applications">
          <div className="info-my-applications">
            <h1>Minhas Vagas</h1>
            <p>Confira as vagas que foram salvas por você</p>
            <div id="title">
              <span>{opportunities.length} vaga(s) encontrada(s)</span>
            </div>
          </div>
        </div>

        <div className="applications">
          <div className="div-opportunities">
            <div className="list-applications">
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
          </div>
        </div>
      </div>
    </>
  );
}
