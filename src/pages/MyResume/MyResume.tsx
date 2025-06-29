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
import ButtomBlue from "../../components/ButtomBlue/ButtomBlue"
import { Competency } from "../../components/CompetenciesForm/CompetenciesForm";
import { Course } from "../../components/CoursesForm/CoursesForm";
import { Experience } from "../../components/ExperiencesForm/ExperiencesForm";
import { useState } from "react";
import { useViaCep } from "../../hooks/useViaCep";
import { useAuth } from "../../contexts/AuthContext";
import InterestAreaForm, { InterestArea } from "../../components/InterestAreaForm/InterestAreaForm";

export default function MyResumePage() {
  const { token } = useAuth()
  const [numero, setNumero] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [error, setError] = useState("");
  const [cep, setCep] = useState("");
  const { endereco, fetchAddress, setEndereco } = useViaCep();
  const [textValueCurriculum, setTextValueCurriculum] = useState<string>("");
  const [textValueAboutMe, setTextValueAboutMe] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [areaActivity, setAreaActivity] = useState<string>("");
  const [dateAreaActivity, setDateAreaActivity] = useState<Date | null>(null);
  const [completedAcademy, setCompletedAcademy] = useState<boolean>(false);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "",
      role: "",
      startDate: null,
      endDate: null,
      currentJob: false,
    },
  ]);

  const [course, setCourse] = useState<Course[]>([
    {
      name: "",
      startDate: null,
      endDate: null,
      completed: false,
    },
  ]);

  const [competencies, setCompetencies] = useState<Competency[]>([
    {
      id: "",
      level: 0
    },
  ]);

  const [interestArea, setInterestArea] = useState<InterestArea[]>([
    {
      id: "",
      name: ""
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
      enderecoCidade: endereco.localidade,
      enderecoEstado: endereco.uf,
      enderecoNumero: numero,
      enderecoRua: endereco.logradouro,
    },
    profissional: {
      curriculo: textValueCurriculum,
      experienciasProfissional: experiences.map(exp => ({
        empresa: exp.company,
        posicao: exp.role,
        dataInicio: exp.startDate,
        dataFim: exp.endDate,
        empregoAtual: exp.currentJob,
      })),
      areasInteresse: interestArea, // array de IDs
      formacaoAcademicas: {
        grau: degree,
        areaAtuacao: areaActivity,
        dataConclusao: dateAreaActivity,
        concluido: completedAcademy,
        certificado: "",
      },
      cursos: course.map(c => ({
        nomeCurso: c.name,
        dataConclusao: c.endDate,
        concluido: c.completed,
        certificado: "",
        vagaId: "",
      })),
      competenciasCandidato: competencies.map(c => ({
        competenciaId: c.id,
        nivel: c.level,
        competenciaId1: null
      })),
    }
  };


  const savePerfil = async () => {
    try {
      const response = await fetch("https://sua.api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
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
          <CustomPanel header="Dados Pessoais" toggleable>
            <span className="title-panel">Sobre mim</span>
            <p className="p-panel">
              Insira uma descrição sobre você, seus hobbies e curiosidades pessoais
            </p>

            <CustomTextArea
              value={textValueAboutMe}
              onChange={(e) => setTextValueAboutMe(e.target.value)}
              placeholder="Digite seu texto aqui..."
              // error={textValueCurriculum == "" ? "Este campo é obrigatório" : undefined}
            />

            <span className="title-panel">Endereço</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="cep"
                  label="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  onBlur={() => fetchAddress(cep)}
                  error={error}
                  placeholder="Insira seu CEP"
                />

                <CustomInputTextPrime
                  id="endereco"
                  label="Endereço"
                  value={endereco.logradouro}
                  onChange={(e) =>
                    setEndereco({ ...endereco, logradouro: e.target.value})
                  }
                  error={error}
                  placeholder="Insira seu endereço"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="bairro"
                  label="Bairro"
                  value={endereco.bairro}
                  onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value})}
                  error={error}
                  placeholder="Insira seu bairro"
                />

                <CustomInputTextPrime
                  id="numero"
                  label="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  error={error}
                  placeholder="Insira o número do seu logradouro"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="cidade"
                  label="Cidade"
                  value={endereco.localidade}
                  onChange={(e) => setEndereco({ ...endereco, localidade: e.target.value})}
                  error={error}
                  placeholder="Insira sua cidade"
                />

                <CustomInputTextPrime
                  id="estado"
                  label="Estado"
                  value={endereco.uf}
                  onChange={(e) => setEndereco({ ...endereco, uf: e.target.value})}
                  error={error}
                  placeholder="Insira seu Estado"
                />
              </div>

              {/* <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomDropdown
                  id="estado"
                  label="Estado"
                  value={perfil}
                  options={options}
                  onChange={(e) => setPerfil(e.value)}
                  placeholder="Selecione seu estado"
                />

                <CustomDropdown
                  id="cidade"
                  label="Cidade"
                  value={perfil}
                  options={options}
                  onChange={(e) => setPerfil(e.value)}
                  placeholder="Selecione sua cidade"
                />
              </div> */}
            </div>
            <br/>

            <span className="title-panel">Redes Sociais</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="linkedin"
                  label="Linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  error={error}
                  placeholder="Link do Linkedin"
                />

                <CustomInputTextPrime
                  id="instagram"
                  label="Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  error={error}
                  placeholder="Link do Instagram"
                />
              </div>
            </div>
          </CustomPanel>
          <CustomPanel header="Dados Profissionais" toggleable>
            <span className="title-panel">Currículo</span>
            <p className="p-panel">
              Insira uma descrição sobre seu currículo e suas experiências profissionais
            </p>

            <CustomTextArea
              value={textValueCurriculum}
              onChange={(e) => setTextValueCurriculum(e.target.value)}
              placeholder="Digite seu texto aqui..."
              // error={textValueCurriculum == "" ? "Este campo é obrigatório" : undefined}
            />
            <br/>

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
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem"}}
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
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem"}}
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
                <br/>
            </div>

            <span className="title-panel">Cursos</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>

            <CoursesForm
              courses={course}
              setCourses={setCourse}
            />
          </CustomPanel>
          <CustomPanel header="Habilidades" toggleable>
            <span className="title-panel">Competências</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <CompetenciesForm competencies={competencies} setCompetencies={setCompetencies}/>
            <br/>
            
            <span className="title-panel">Áreas de Interesse</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <InterestAreaForm interestArea={interestArea} setInterestArea={setInterestArea}/>
          </CustomPanel>

          <ButtomBlue text_button="Salvar" onClick={() => savePerfil()}/>
        </div>
      </div>
    </>
  );
}
