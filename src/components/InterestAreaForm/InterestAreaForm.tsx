import { useState } from "react";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import CustomInputTextPrime from "../CustomInputTextPrime/CustomInputTextPrime";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getInterestAreasOptions } from "../../services/interestAreaService";

export interface InterestArea {
  id: string;
  name: string;
}

interface InterestAreaFormFormProps {
  interestArea: InterestArea[];
  setInterestArea: React.Dispatch<React.SetStateAction<InterestArea[]>>;
}

export default function InterestAreaForm({interestArea, setInterestArea}: InterestAreaFormFormProps) {

  const [interestAreaOptions, setInterestAreaOptions] = useState<
  { label: string; value: string }[]
  >([]);

  const { token } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      const options = await getInterestAreasOptions(token);
      setInterestAreaOptions(options);
    };

    loadData();
  }, []);

  const handleChange = <T extends keyof InterestArea>(
    index: number,
    field: T,
    value: InterestArea[T]
  ) => {
    const updated = [...interestArea];
    updated[index][field] = value;

    setInterestArea(updated);
  };

  const addInterestArea = () => {
    const hasEmpty = interestArea.some((c) => !c.id);

    if (hasEmpty) {
      toast.error("Preencha a competência anterior antes de adicionar outra.");
      return;
    }

    setInterestArea([
      ...interestArea,
      {
        id: "",
        name: "",
      },
    ]);
  };

  const removeExperience = (indexToRemove: number) => {
    const updated = interestArea.filter((_, i) => i !== indexToRemove);
    setInterestArea(updated);
  };

  return (
    <div className="flex flex-column gap-4">
      {interestArea.map((exp, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "1.6rem"}}>

            <CustomDropdown
              id={`interestArea-${index}`}
              label="Áreas de Interesse"
              value={exp.id}
              options={interestAreaOptions}
              onChange={(e) => {
                const selectedId = e.value;

                const alreadyExists = interestArea.some(
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
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "1.6rem", justifyContent: "flex-end"}}>
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
              Remover área de interesse
            </a>
          </div>
        </div>
      ))}

      <a
        onClick={addInterestArea}
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
        Adicionar área de interesse
      </a>
    </div>
  );
}
