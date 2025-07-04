import "./MyResume.css";
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
import { useState } from "react";
import { useViaCep } from "../../hooks/useViaCep";
import { useAuth } from "../../contexts/AuthContext";
import InterestAreaForm, {
  InterestArea,
} from "../../components/InterestAreaForm/InterestAreaForm";
import {
  ProfessionalProfilePayloadType,
  validationProfessionalProfile,
  Experience,Course,Competency,Formation
} from "../../types/ProfessionalProfileType";

export default function MyResumePage2() {
  const { user, token } = useAuth();
  const [professionalProfilePayload, setProfessionalProfilePayload] = useState<ProfessionalProfilePayloadType>({
    idUsuario: user?.id || "",
    perfilProfissional: {
      id: "",
      curriculo: "",
      experienciasProfissional: [],
      areasInteresse: [],
      formacaoAcademicas: [],
      cursos: [],
      competenciasCandidato: [],
    },
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Altera campos raiz
  const handleRootChange = (
    field: keyof ProfessionalProfilePayloadType,
    value: string
  ) => {
    setProfessionalProfilePayload((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Altera campos diretos de perfilProfissional que sejam string
  const handlePerfilProfissionalFieldChange = (
    field: keyof Omit<
      ProfessionalProfilePayloadType["perfilProfissional"],
      | "experienciasProfissional"
      | "areasInteresse"
      | "formacaoAcademicas"
      | "cursos"
      | "competenciasCandidato"
    >,
    value: string
  ) => {
    setProfessionalProfilePayload((prev) => ({
      ...prev,
      perfilProfissional: {
        ...prev.perfilProfissional,
        [field]: value,
      },
    }));
  };

  // Atualiza o array de experiências
  const handleExperiencesChange = (newExperiences: Experience[]) => {
    setProfessionalProfilePayload((prev) => ({
      ...prev,
      perfilProfissional: {
        ...prev.perfilProfissional,
        experienciasProfissional: newExperiences,
      },
    }));
  };

  // Atualiza o array de áreas de interesse
  const handleAreasInteresseChange = (newAreas: string[]) => {
    setProfessionalProfilePayload((prev) => ({
      ...prev,
      perfilProfissional: {
        ...prev.perfilProfissional,
        areasInteresse: newAreas,
      },
    }));
  };

  // Atualiza o array de formações acadêmicas
  const handleFormacoesChange = (newFormations: Formation[]) => {
    setProfessionalProfilePayload((prev) => ({
      ...prev,
      perfilProfissional: {
        ...prev.perfilProfissional,
        formacaoAcademicas: newFormations,
      },
    }));
  };

  // Atualiza o array de cursos
  const handleCursosChange = (newCourses: Course[]) => {
    setProfessionalProfilePayload((prev) => ({
      ...prev,
      perfilProfissional: {
        ...prev.perfilProfissional,
        cursos: newCourses,
      },
    }));
  };

  // Atualiza o array de competências
  const handleCompetenciasChange = (newCompetencias: Competency[]) => {
    setProfessionalProfilePayload((prev) => ({
      ...prev,
      perfilProfissional: {
        ...prev.perfilProfissional,
        competenciasCandidato: newCompetencias,
      },
    }));
  };

  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const { endereco, fetchAddress, setEndereco } = useViaCep();
  const [textValueCurriculum, setTextValueCurriculum] = useState<string>("");
  const [textValueAboutMe, setTextValueAboutMe] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [areaActivity, setAreaActivity] = useState<string>("");
  const [dateAreaActivity, setDateAreaActivity] = useState<Date | null>(null);
  const [completedAcademy, setCompletedAcademy] = useState<boolean>(false);

  const [experiences, setExperiences] = useState<ExperienceForm[]>([
    {
      company: "",
      role: "",
      startDate: null,
      endDate: null,
      currentJob: false,
    },
  ]);

  const [course, setCourse] = useState<CourseForm[]>([
    {
      name: "",
      startDate: null,
      endDate: null,
      completed: false,
    },
  ]);

  const [competencies, setCompetencies] = useState<CompetencyForm[]>([
    {
      id: "",
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

  const payload = {
    idUsuario: "",
    dataNascimento: "",
    perfilPessoal: {
      classificacaoAfirmativa: "",
      corRaca: "",
      pronome: "",
      identidadeGenero: "",
      orientacaoSexual: "",
      sobreMim: textValueAboutMe,
      enderecoBairro: endereco.bairro,
      enderecoCEP: cep,
      enderecoCidade: endereco.cidade,
      enderecoEstado: endereco.estado,
      enderecoNumero: numero,
      enderecoRua: endereco.rua,
    },
    profissional: {
      curriculo: textValueCurriculum,
      experienciasProfissional: experiences.map((exp) => ({
        empresa: exp.company,
        posicao: exp.role,
        dataInicio: exp.startDate,
        dataFim: exp.endDate,
        empregoAtual: exp.currentJob,
      })),
      areasInteresse: interestArea,
      formacaoAcademicas: {
        grau: degree,
        areaAtuacao: areaActivity,
        dataConclusao: dateAreaActivity,
        concluido: completedAcademy,
        certificado: "",
      },
      cursos: course.map((c) => ({
        nomeCurso: c.name,
        dataConclusao: c.endDate,
        concluido: c.completed,
        certificado: "",
        vagaId: "",
      })),
      competenciasCandidato: competencies.map((c) => ({
        competenciaId: c.id,
        nivel: c.level,
        competenciaId1: null,
      })),
    },
  };

  const savePerfil = async () => {
    try {
      const response = await fetch("https://sua.api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar dados.");
      }

      const data = await response.json();
      console.log("Salvo com sucesso:", data);
    } catch (error) {
      console.error(error);
    }
  };

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
              value={professionalProfilePayload.perfilProfissional.curriculo}
              onChange={(e) =>
                handlePerfilProfissionalFieldChange("curriculo", e.target.value)
              }              
              placeholder="Digite seu texto aqui..."
              error={"Currículo é obrigatório"}
              required={true}
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
                  id={"dataFimAcademic"}
                  label="Data Fim"
                  value={dateAreaActivity}
                  onChange={(e) => setDateAreaActivity(e.value as Date)}
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

          <ButtomBlue text_button="Salvar" onClick={() => savePerfil()} />
        </div>
      </div>
    </>
  );
}
