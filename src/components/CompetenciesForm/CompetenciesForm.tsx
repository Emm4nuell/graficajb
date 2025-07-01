import { useState } from "react";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import CustomInputTextPrime from "../CustomInputTextPrime/CustomInputTextPrime";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { getCompetenciesOptions } from "../../services/competenciesService";
import { useAuth } from "../../contexts/AuthContext";

export interface Competency {
  id: string;
  level: number;
}

interface CompetenciesFormProps {
  competencies: Competency[];
  setCompetencies: React.Dispatch<React.SetStateAction<Competency[]>>;
}

export default function CompetenciesForm({competencies, setCompetencies}: CompetenciesFormProps) {

  const [competencyOptions, setCompetencyOptions] = useState<
  { label: string; value: string }[]
  >([]);

  console.log(competencies)

  const { token } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      const options = await getCompetenciesOptions(token);
      setCompetencyOptions(options);
    };

    loadData();
  }, []);

  const levelOptions = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  const handleChange = <T extends keyof Competency>(
    index: number,
    field: T,
    value: Competency[T]
  ) => {
    const updated = [...competencies];
    updated[index][field] = value;

    setCompetencies(updated);
  };

  const addCompetency = () => {
    const hasEmpty = competencies.some((c) => !c.id);

    if (hasEmpty) {
      toast.error("Preencha a competência anterior antes de adicionar outra.");
      return;
    }

    setCompetencies([
      ...competencies,
      {
        id: "",
        level: 0,
      },
    ]);
  };

  const removeExperience = (indexToRemove: number) => {
    const updated = competencies.filter((_, i) => i !== indexToRemove);
    setCompetencies(updated);
  };

  return (
    <div className="flex flex-column gap-4">
      {competencies.map((exp, index) => (
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

            <CustomDropdown
              id={`competency-${index}`}
              label="Competência"
              value={exp.id}
              options={competencyOptions}
              onChange={(e) => {
                const selectedId = e.value;

                const alreadyExists = competencies.some(
                  (c, i) => c.id === selectedId && i !== index
                );

                if (alreadyExists) {
                  toast.error("Essa competência já foi adicionada.");
                  return;
                }

                handleChange(index, "id", selectedId);
              }}
              placeholder="Selecione uma competência"
            />

            <CustomDropdown
              id={`level-${index}`}
              label="Nível de conhecimento"
              value={exp.level}
              options={levelOptions}
              onChange={(e) => handleChange(index, "level", e.value)}
              placeholder="Selecione o nível de conhecimento"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "1.6rem", justifyContent: "flex-end" }}>
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
              Remover competência
            </a>
          </div>
        </div>
      ))}

      <a
        onClick={addCompetency}
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
        Adicionar competência
      </a>
    </div>
  );
}
