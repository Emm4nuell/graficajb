import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomInputTextPrime from "../CustomInputTextPrime/CustomInputTextPrime";

export interface ExperienceForm {
  id: string,
  company: string;
  role: string;
  startDate: Date | null;
  endDate: Date | null;
  currentJob: boolean;
}

interface ExperiencesFormProps {
  experiences: ExperienceForm[];
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceForm[]>>;
}

export default function ExperiencesForm({experiences, setExperiences}: ExperiencesFormProps) {

  const handleChange = <T extends keyof ExperienceForm>(
    index: number,
    field: T,
    value: ExperienceForm[T]
  ) => {
    const updated = [...experiences];
    updated[index][field] = value;

    // Se marcar "Emprego Atual", zera Data Fim
    if (field === "currentJob" && value === true) {
      updated[index].endDate = null;
    }

    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: "",
        company: "",
        role: "",
        startDate: null,
        endDate: null,
        currentJob: false,
      },
    ]);
  };

  const removeExperience = (indexToRemove: number) => {
    const updated = experiences.filter((_, i) => i !== indexToRemove);
    setExperiences(updated);
  };

  return (
    <div className="flex flex-column gap-4">
      {experiences.map((exp, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}>
            <CustomInputTextPrime
              id={`empresa-${index}`}
              label="Empresa"
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              placeholder="Nome da empresa"
            />

            <CustomInputTextPrime
              id={`cargo-${index}`}
              label="Cargo"
              value={exp.role}
              onChange={(e) => handleChange(index, "role", e.target.value)}
              placeholder="Seu cargo"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}>
            <CustomCalendar
              id={`inicio-${index}`}
              label="Data Início"
              value={exp.startDate}
              onChange={(e) =>
                handleChange(index, "startDate", e.value ?? null)
              }
              placeholder="Selecione uma data"
              showIcon
            />

            <CustomCalendar
              id={`fim-${index}`}
              label="Data Fim"
              value={exp.endDate}
              onChange={(e) => handleChange(index, "endDate", e.value ?? null)}
              placeholder="Selecione uma data"
              disabled={exp.currentJob}
              showIcon
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "1.6rem", justifyContent: "space-between" }}>
            <CustomCheckbox
              id={`empregoAtual-${index}`}
              label="Emprego Atual"
              checked={exp.currentJob}
              onChange={(checked) => handleChange(index, "currentJob", checked)}
            />

            <a
              onClick={() => removeExperience(index)}
              className="flex align-items-center gap-2"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: ".4rem",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: 500,
                color: "#ef4444",
                fontSize: ".87rem"
              }}
            >
              <i className="pi pi-trash" style={{ fontSize: ".87rem" }}></i>
              Remover experiência
            </a>
          </div>
        </div>
      ))}

      <a
        onClick={addExperience}
        className="w-full md:w-auto"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: ".4rem",
          cursor: "pointer",
          color: "#2563eb",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: ".87rem"
        }}
      >
        <i className="pi pi-plus" style={{ fontSize: ".87rem" }}></i>
        Adicionar nova experiência
      </a>
    </div>
  );
}
