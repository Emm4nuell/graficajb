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
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getProfessionalProfile } from "../../services/getProfessionalProfile";
import CustomButtom from "../../components/CustomButtom/CustomButtom";

export default function CandidaciesPage() {
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

    fetchProfile();
  }, []);

  return (
    <>
      <Header />
      <div className="my-resume">
        <div className="info-my-resume">
          <h1>Meu Currículo</h1>
          <p>
            Aqui estão seus dados pessoais, profissionais, acadêmicos e suas
            habilidades
          </p>
        </div>

        <div className="main-my-resume">
          <CustomPanel header="Dados Profissionais" toggleable>
            <span className="title-panel">Currículo</span>
            <p className="p-panel">
              Insira uma descrição sobre seu currículo e suas experiências
              profissionais
            </p>

            <CustomTextArea
              value={textValueCurriculum}
              onChange={(e) => setTextValueCurriculum(e.target.value)}
              placeholder="Digite seu texto aqui..."
              // error={textValueCurriculum == "" ? "Este campo é obrigatório" : undefined}
            />
            <br />

            <span className="title-panel">Experiência</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <ExperiencesForm
              experiences={experiences}
              setExperiences={setExperiences}
            />
          </CustomPanel>

          <CustomPanel header="Dados Acadêmicos" toggleable>
            <span className="title-panel">Formação Acadêmica</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomDropdown
                  id="degree"
                  label="Grau de Formação"
                  value={degree}
                  options={degreeOptions}
                  onChange={(e) => setDegree(e.value)}
                  placeholder="Selecione seu grau de formação"
                />

                <CustomDropdown
                  id="areaActivity"
                  label="Área de Atuação"
                  value={areaActivity}
                  options={areaActivityOptions}
                  onChange={(e) => setAreaActivity(e.value)}
                  placeholder="Selecione sua área de atuação"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomCalendar
                  id={"dataInicialAcademic"}
                  label="Data de Início"
                  value={dateInitialAreaActivity}
                  onChange={(e) => setDateInitialAreaActivity(e.value as Date)}
                  placeholder="Selecione uma data"
                  disabled={completedAcademy}
                  showIcon
                />

                <CustomCalendar
                  id={"dataFimAcademic"}
                  label={
                    completedAcademy
                      ? "Previsão de Conclusão"
                      : "Data de Conclusão"
                  }
                  value={dateFinalAreaActivity}
                  onChange={(e) => setDateFinalAreaActivity(e.value as Date)}
                  placeholder="Selecione uma data"
                  disabled={completedAcademy}
                  showIcon
                />
              </div>
              <CustomCheckbox
                id={"notCompleted"}
                label="Não Concluído"
                checked={completedAcademy}
                onChange={() => setCompletedAcademy(!completedAcademy)}
              />
              <br />
            </div>

            <span className="title-panel">Cursos</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>

            <CoursesForm courses={course} setCourses={setCourse} />
          </CustomPanel>
          <CustomPanel header="Habilidades" toggleable>
            <span className="title-panel">Competências</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <CompetenciesForm
              competencies={competencies}
              setCompetencies={setCompetencies}
            />
            <br />

            <span className="title-panel">Áreas de Interesse</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <InterestAreaForm
              interestArea={interestArea}
              setInterestArea={setInterestArea}
            />
          </CustomPanel>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.6rem",
              justifyContent: "flex-end",
            }}
          >
            <CustomButtom
              text="Cancelar"
              color="#929090"
              onClick={() => {
                navigate("/overview");
              }}
            />

            <CustomButtom
              text="Salvar"
              color="#00A8EA"
              onClick={() => handleProfessionalProfile()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
