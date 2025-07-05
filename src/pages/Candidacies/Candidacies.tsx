import "./Candidacies.css";
import Header from "../../components/Header/Header";
import CustomPanel from "../../components/CustomPanel/CustomPanel";
import CustomInputTextPrime from "../../components/CustomInputTextPrime/CustomInputTextPrime";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import ExperiencesForm from "../../components/ExperiencesForm/ExperiencesForm";
import CoursesForm from "../../components/CoursesForm/CoursesForm";
import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox";
import CompetenciesForm from "../../components/CompetenciesForm/CompetenciesForm";
import ButtomBlue from "../../components/ButtomBlue/ButtomBlue";
import { CompetencyForm } from "../../components/CompetenciesForm/CompetenciesForm";
import { CourseForm } from "../../components/CoursesForm/CoursesForm";
import { ExperienceForm } from "../../components/ExperiencesForm/ExperiencesForm";
import { useEffect, useState } from "react";
import { useViaCep } from "../../hooks/useViaCep";
import { useAuth } from "../../contexts/AuthContext";
import InterestAreaForm, {
  InterestArea,
} from "../../components/InterestAreaForm/InterestAreaForm";
import { id } from "zod/v4/locales";
import {
  validationProfessionalProfile,
  ProfessionalProfilePayloadType,
} from "../../types/ProfessionalProfileType";
import { saveProfessionalProfileService } from "../../services/saveProfessionalProfileService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { getProfessionalProfile } from "../../services/getProfessionalProfile";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import { getCandidaciesByVacancy } from "../../services/getCandidaciesByVacancy";
import { getProfile } from "../../services/getProfile";
import { ProfileResponseType } from "../../types/ProfileResponseType ";
import { defaultGetVacancy, GetVacancyType } from "../../types/GetVacancyType";
import { getVacancyById } from "../../services/getVacancyById";

export default function CandidaciesPage() {
  const [detalhes, setDetalhes] = useState<(ProfileResponseType | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [vacancy, setVacancy] = useState<GetVacancyType>(defaultGetVacancy);
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [textValueCurriculum, setTextValueCurriculum] = useState<string>("");
  const [idProfessionalProfile, setIdProfessionalProfile] =
    useState<string>("");
  const [idAcademic, setidAcademic] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [areaActivity, setAreaActivity] = useState<string>("");
  const [dateInitialAreaActivity, setDateInitialAreaActivity] =
    useState<Date | null>(null);
  const [dateFinalAreaActivity, setDateFinalAreaActivity] =
    useState<Date | null>(null);
  const [completedAcademy, setCompletedAcademy] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const corRacaMap: Record<number, string> = {
    1: "Branca",
    2: "Preta",
    3: "Parda",
    4: "Amarela",
    5: "Indígena",
    6: "Não desejo declarar",
    7: "Outra",
  };

  const sexualOrientationMap: Record<number, string> = {
    1: "Masculino",
    2: "Feminino",
    3: "Outro",
  };

  const [experiences, setExperiences] = useState<ExperienceForm[]>([
    {
      id: "",
      company: "",
      role: "",
      startDate: null,
      endDate: null,
      currentJob: false,
    },
  ]);

  const [course, setCourse] = useState<CourseForm[]>([
    {
      id: "",
      name: "",
      startDate: null,
      endDate: null,
      completed: false,
    },
  ]);

  const [competencies, setCompetencies] = useState<CompetencyForm[]>([
    {
      id: "",
      competenciaId: "",
      level: 0,
    },
  ]);

  const [interestArea, setInterestArea] = useState<InterestArea[]>([
    {
      id: "",
      name: "",
    },
  ]);

  const degreeOptions = [
    { label: "Ensino Fundamental Completo", value: "EFC" },
    { label: "Ensino Fundamental Incompleto", value: "EFI" },
    { label: "Ensino Médio Completo", value: "EMC" },
    { label: "Ensino Médio Incompleto", value: "EMI" },
    { label: "Ensino Técnico", value: "ETC" },
    { label: "Ensino Técnico Incompleto", value: "ETI" },
    { label: "Ensino Superior Completo", value: "ESC" },
    { label: "Ensino Superior Incompleto", value: "ESI" },
    { label: "Pós-graduação", value: "POS" },
    { label: "Mestrado", value: "MES" },
    { label: "Doutorado", value: "DOC" },
    { label: "Outro", value: "OUT" },
  ];

  const areaActivityOptions = [
    { label: "Administração", value: "ADM" },
    { label: "Agronegócio", value: "AGR" },
    { label: "Arquitetura e Urbanismo", value: "ARQ" },
    { label: "Artes e Design", value: "ART" },
    { label: "Comércio e Varejo", value: "COM" },
    { label: "Educação", value: "EDU" },
    { label: "Engenharia", value: "ENG" },
    { label: "Finanças", value: "FIN" },
    { label: "Jurídico", value: "JUR" },
    { label: "Logística", value: "LOG" },
    { label: "Marketing e Publicidade", value: "MKT" },
    { label: "Recursos Humanos", value: "RH" },
    { label: "Saúde", value: "SAU" },
    { label: "Tecnologia da Informação", value: "TI" },
    { label: "Vendas", value: "VEN" },
    { label: "Outro", value: "OUT" },
  ];

  const payload: ProfessionalProfilePayloadType = {
    idUsuario: user?.id || "",
    perfilProfissional: {
      id: idProfessionalProfile,
      curriculo: textValueCurriculum,
      experienciasProfissional: experiences.map((exp) => ({
        id: exp.id || "",
        empresa: exp.company,
        posicao: exp.role,
        dataInicio: exp.startDate ? exp.startDate.toISOString() : "",
        dataFim: exp.endDate ? exp.endDate.toISOString() : "",
        empregoAtual: exp.currentJob,
      })),
      areasInteresse: interestArea.map((area) => area.id),
      formacaoAcademicas: [
        {
          id: idAcademic,
          grau: degree,
          areaAtuacao: areaActivity,
          dataInicio: dateInitialAreaActivity
            ? dateInitialAreaActivity.toISOString()
            : "",
          dataConclusao: dateFinalAreaActivity
            ? dateFinalAreaActivity.toISOString()
            : "",
          concluido: completedAcademy,
          certificado: "",
        },
      ],
      cursos: course.map((c) => ({
        id: c.id || "",
        nomeCurso: c.name,
        dataInicio: c.startDate ? c.startDate.toISOString() : "",
        dataConclusao: c.endDate ? c.endDate.toISOString() : "",
        concluido: c.completed,
        certificado: "",
        vagaId: "",
      })),
      competenciasCandidato: competencies.map((c) => ({
        id: c.id || "",
        competenciaId: c.competenciaId,
        nivel: c.level,
        competenciaId1: null, // Aqui não pode ser null!
      })),
    },
  };

  const handleProfessionalProfile = async () => {
    console.log(payload);

    // Limpa erros antigos
    setValidationErrors({});

    try {
      validationProfessionalProfile.parse(payload);

      const res = await saveProfessionalProfileService(payload, token);
      toast.success("Dados salvos com sucesso!");
      navigate("/overview");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          toast.error(err.message);
          fieldErrors[path] = err.message;
        });

        setValidationErrors(fieldErrors);

        // toast.error("Verifique os campos obrigatórios.");
        console.error("Erros de validação:", error);
        return;
      }

      toast.error("Ocorreu um erro ao salvar.");
      console.error("Erro no envio:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfessionalProfile(token || "", user?.id || "");
      if (result) {
        console.log(result);
        setIdProfessionalProfile(result.id);
        // Currículo
        setTextValueCurriculum(result.curriculo);

        // Experiências
        setExperiences(
          result.experienciasProfissional.map((exp) => ({
            id: exp.id,
            company: exp.empresa,
            role: exp.posicao,
            startDate: exp.dataInicio ? new Date(exp.dataInicio) : null,
            endDate: exp.dataFim ? new Date(exp.dataFim) : null,
            currentJob: exp.empregoAtual,
          }))
        );

        // Áreas de interesse
        setInterestArea(
          result.areasInteresse.map((id) => ({
            id: id,
            name: "", // Preencha se tiver mais dados disponíveis
          }))
        );

        // Formação acadêmica
        if (result.formacaoAcademicas.length > 0) {
          const formacao = result.formacaoAcademicas[0];
          setidAcademic(formacao.id);
          setDegree(formacao.grau);
          setAreaActivity(formacao.areaAtuacao);
          setDateInitialAreaActivity(
            formacao.dataInicio ? new Date(formacao.dataInicio) : null
          );
          setDateFinalAreaActivity(
            formacao.dataConclusao ? new Date(formacao.dataConclusao) : null
          );
          setCompletedAcademy(formacao.concluido);
        }

        // Cursos
        setCourse(
          result.cursos.map((c) => ({
            id: c.id,
            name: c.nomeCurso,
            startDate: c.dataInicio ? new Date(c.dataInicio) : null,
            endDate: c.dataConclusao ? new Date(c.dataConclusao) : null,
            completed: c.concluido,
          }))
        );

        // Competências
        setCompetencies(
          result.competenciasCandidato.map((c) => ({
            id: c.id,
            competenciaId: c.competenciaId,
            level: c.nivel,
          }))
        );
      }
    };

    const fetchDetalhes = async () => {
      setLoading(true);

      try {
        // 1) Buscar lista de IDs
        const ids = await getCandidaciesByVacancy(token || "", id || "");
        // Ex.: ["id1", "id2", ...]

        if (!ids || ids.length === 0) {
          setDetalhes([]);
          setLoading(false);
          return;
        }

        // 2) Criar array de Promises para buscar detalhes
        const detalhesData = await Promise.all(
          ids.map(async (id) => {
            try {
              const res = await getProfile(token || "", id);
              return res;
            } catch (error) {
              console.error(`Erro ao buscar candidato ${id}:`, error);
              return null;
            }
          })
        );

        // 3) Filtrar nulls
        const detalhesValidos = detalhesData.filter(
          (d): d is ProfileResponseType => d !== null
        );

        // 4) Salvar no state
        setDetalhes(detalhesValidos);
        console.log(detalhes);
      } catch (error) {
        console.error("Erro geral ao carregar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDetailVacancie = async () => {
      try {
        if (id) {
          const data = await getVacancyById(id);
          if (data) {
            setVacancy(data);
          } else {
            console.error("Dados da vaga vieram nulos");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar vaga:", error);
      }
    };

    fetchProfile();
    fetchDetalhes();
    fetchDetailVacancie();
  }, []);

  return (
    <>
      <Header />
      <div className="candidacies">
        <div className="info-candidacies">
          <h1>Candidaturas</h1>
          <p>
            <b>Vaga:</b> {vacancy.titulo}
          </p>
        </div>

        <div className="main-candidacies">
          {loading ? (
            <h4>Carregando dados...</h4>
          ) : (
            detalhes.map((e) => (
              <>
                <h4>Candidato: {e?.id}</h4>
                <p>
                  <strong>Cor/Raça:</strong> {corRacaMap[e?.corRaca || 0]}
                </p>
                <p>
                  <strong>Orientação Sexual:</strong>{" "}
                  {sexualOrientationMap[e?.orientacaoSexual || 0]}
                </p>
                <p>
                  <strong>Telefone:</strong> {e?.telefone}
                </p>
                <p>
                  <strong>Data de Nascimento:</strong>{" "}
                  {e?.dataNascimento
                    ? new Date(e.dataNascimento).toLocaleDateString()
                    : "Não informado"}
                </p>
                <p>
                  <strong>Sobre Mim:</strong> {e?.sobreMim}
                </p>
                <p>
                  <strong>Endereço:</strong>{" "}
                  {`${e?.enderecoRua}, ${e?.enderecoNumero}, ${e?.enderecoBairro}, ${e?.enderecoCidade} - ${e?.enderecoEstado}, CEP ${e?.enderecoCEP}`}
                </p>
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}
