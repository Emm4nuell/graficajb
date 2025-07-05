import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./DetailVacancies.css";
import { detailsVacanciesServices } from "../../services/Detailvacancies";
import {
  defaultOpportunitie,
  OpportunitieType,
} from "../../types/OpportunitiesType";
import CardOpportunity from "../../components/card/cardOpportunity/CardOpportunity";
import { opportunityService } from "../../services/opportunityService";
import { CustomFilter, defaultCustomerFilter } from "../../types/FilterType";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import { useAuth } from "../../contexts/AuthContext";
import EditVacancy from "../EditVacancy/EditVacancy";
import { useNavigate } from "react-router-dom";
import { myApplicationsService } from "../../services/getMyApplicationsService";
import { CustomerApplication } from "../../types/ApplicationType";
import { applicationsservice } from "../../services/MyApplicationsService";
import CandidacyCard from "../../components/CandidacyCard/CandidacyCard";
import { getCandidaciesByVacancy } from "../../services/getCandidaciesByVacancy";
import { toast } from "react-toastify";

export default function DetailVacancies() {
  const { user, token, perfilCandidato, isAuthenticated } = useAuth();
  const [application, setApplication] = useState<CustomerApplication>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [filter, setFilter] = useState<CustomFilter>(defaultCustomerFilter);
  const [opportunities, setOpportunities] = useState<OpportunitieType[]>([
    defaultOpportunitie,
  ]);
  const [opportunitie, setOpportunitie] =
    useState<OpportunitieType>(defaultOpportunitie);
  const [candidacies, setCandidacies] = useState(0);

  const fetchDetailVacancie = async () => {
    try {
      if (id) {
        const data = await detailsVacanciesServices(id);
        setOpportunitie(data);
      }
    } catch (error) {
      console.error("Erro ao buscar vaga:", error);
    }
  };

  const fetchOpportunities = async () => {
    setFilter((e) => ({ ...e, size: 3 }));
    try {
      const data = await opportunityService(filter);

      setOpportunities(data);
    } catch (error) {
      if (error.message.includes("401")) {
        localStorage.removeItem("token");
        console.log("Erro acionado com sucesso");
      }
    }
  };

  const fetchMyApplication = async () => {
    try {
      const newApplication = {
        candidateId: user?.id!,
        vagaId: id!,
      };
      await applicationsservice(token!, newApplication!);
      toast.success("Candidatura realizada com sucesso.");
      navigate("/myapplications");
    } catch (error) {
      if (error.message.includes("401")) {
        localStorage.removeItem("token");
        console.log("Erro acionado com sucesso");
      }
    }
  };

  const fetchCandidacies = async () => {
    const data = await getCandidaciesByVacancy(token || "", id || "");
    setCandidacies(data.length);
  };

  useEffect(() => {
    fetchDetailVacancie();
    fetchOpportunities();
    fetchCandidacies();
  }, [id]);

  return (
    <>
      <Header />

      <div className="grid-details">
        <div className="detail-vacancies">
          <div className="info-title-page-detail-vacancies">
            <span>Vaga</span>
            <h1>{opportunitie.titulo}</h1>
          </div>
          <div className="info-detail-vacancies">
            <div className="list-info-details">
              <div className="topic-card">
                <div
                  style={{
                    border: "2px solid #00A8EA",
                    height: "100%",
                    backgroundColor: " #00A8EA",
                  }}
                />
                <div
                  style={{
                    border: "2px solid #DF2A8C",
                    height: "100%",
                    backgroundColor: " #DF2A8C",
                  }}
                />
                <div
                  style={{
                    border: "2px solid #FFCC00",
                    height: "100%",
                    backgroundColor: " #FFCC00",
                  }}
                />
                <div className="title-info">{opportunitie.regimeTrabalho}</div>
              </div>
            </div>
          </div>
          <div className="info-detail-vacancies">
            <h1 className="info-title-detail-vacancies">Descrição da Vaga</h1>
            <p className="info-desc-detail-vacancies">
              {opportunitie.descricao}
            </p>
          </div>
          <div className="info-detail-vacancies">
            <h1 className="info-title-detail-vacancies">Responsabilidades</h1>
            <p className="info-desc-detail-vacancies">
              <strong>Cargo:</strong> {opportunitie.cargo}
              <br />
              <strong>Atividades:</strong> {opportunitie.atividades}
            </p>
          </div>
          <div className="info-detail-vacancies">
            <h1 className="info-title-detail-vacancies">Benefícios</h1>
            <p className="info-desc-detail-vacancies">
              {opportunitie.beneficios}
            </p>
          </div>
          <div className="info-detail-vacancies">
            <h1 className="info-title-detail-vacancies">Diferenciais</h1>
            <p className="info-desc-detail-vacancies">
              {opportunitie.diferenciais}
            </p>
          </div>
          <div className="info-detail-vacancies">
            <h1 className="info-title-detail-vacancies">
              Informações Adicionais
            </h1>
            <p className="info-desc-detail-vacancies">
              <strong>Tipo de contratação:</strong>{" "}
              {opportunitie.tipoContratacao}
              <br />
              <strong>Jornada de trabalho:</strong>{" "}
              {opportunitie.horarioTrabalho}
            </p>
          </div>
          {opportunitie.endereco && (
            <div className="info-detail-vacancies">
              <h1 className="info-title-detail-vacancies">Local da Vaga</h1>
              <p className="info-desc-detail-vacancies">
                {opportunitie.endereco.rua},{" "}
                {opportunitie.endereco.numero || "s/n"} –{" "}
                {opportunitie.endereco.bairro}, {opportunitie.endereco.cidade} –{" "}
                {opportunitie.endereco.uf} – CEP {opportunitie.endereco.cep}
              </p>
            </div>
          )}
          <div className="info-detail-vacancies">
            <h1 className="info-title-detail-vacancies">Sobre a Gráfica JB</h1>
            <p className="info-desc-detail-vacancies">
              Em julho de 1983 surgiu em João Pessoa a Gráfica JB, pequena e
              modesta, mas com um grande potencial. Ao longo dos anos se
              desenvolveu e traçou novos caminhos, sempre oferecendo qualidade e
              agilidade como diferencial. Atualmente atende em todo o Nordeste e
              destaca-se pelo relacionamento e compromisso com os clientes.
              <br />
              <br />A sede atual conta com um parque gráfico de mais de 8.000 m²
              no coração da capital paraibana, que proporciona o fácil acesso
              para clientes e facilita a logística. Com investimentos contínuos
              em tecnologia e qualificação, a Gráfica JB consolidou-se no
              mercado e é uma das maiores gráficas planas do país. Nos últimos
              anos uma nova JB vem surgindo, realinhando seus processos e
              serviços. O mercado vem passando por transformações e a JB vem
              acompanhando esse ritmo.
            </p>
          </div>
        </div>

        <div className="info-detail-vacancies-card">
          {isAuthenticated ? (
            perfilCandidato ? (
              <div className="info-detail-vacancies-buttom">
                <CustomButtom
                  color="#DF2A8C"
                  text="Candidatar-se"
                  onClick={() => {
                    fetchMyApplication();
                  }}
                />
                <CustomButtom
                  color="#616161"
                  text="Compartilhar"
                  onClick={() => {}}
                />
              </div>
            ) : (
              <div className="candidacy-card-details">
                <CandidacyCard total={candidacies} idVacancy={id || ""}/>

                <CustomButtom
                  color="#DF2A8C"
                  text="Editar Vaga"
                  onClick={() => {
                    navigate(`/editvacancy/${id}`);
                  }}
                />
              </div>
            )
          ) : (
            <div className="info-detail-register-not-auth">
              <span>
                Para se candidatar é necessário ter uma conta.{" "}
                <Link to={"/register"}>Cadastre-se</Link>
              </span>
              <br />
            </div>
          )}

          <h1 className="info-title-detail-vacancies">Outras oportunidades</h1>
          <div className="info-detail-vacancies-card-list">
            {opportunities.map((value, index) => (
              <CardOpportunity
                key={index}
                id={value.id}
                title={value.titulo}
                subtitle={`${value.endereco.cidade} - ${value.endereco.uf}`}
                topic={[value.regimeTrabalho]}
                date={"Postada há 5 dias"}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
