import CustomCalendar from "../CustomCalendar/CustomCalendar";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomInputTextPrime from "../CustomInputTextPrime/CustomInputTextPrime";

export interface Course {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  completed: boolean;
}

interface CourseFormProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

export default function CoursesForm({courses, setCourses}: CourseFormProps) {

  const handleChange = <T extends keyof Course>(
    index: number,
    field: T,
    value: Course[T]
  ) => {
    const updated = [...courses];
    updated[index][field] = value;

    if (field === "completed" && value === true) {
      updated[index].endDate = null;
    }

    setCourses(updated);
  };

  const addExperience = () => {
    setCourses([
      ...courses,
      {
        name: "",
        startDate: null,
        endDate: null,
        completed: false,
      },
    ]);
  };

  const removeExperience = (indexToRemove: number) => {
    const updated = courses.filter((_, i) => i !== indexToRemove);
    setCourses(updated);
  };

  return (
    <div className="flex flex-column gap-4">
      {courses.map((exp, index) => (
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
              id={`nome-${index}`}
              label="Nome do Curso"
              value={exp.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Nome do Curso"
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
              disabled={exp.completed}
              showIcon
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "1.6rem", justifyContent: "space-between" }}>
            <CustomCheckbox
              id={`empregoAtual-${index}`}
              label="Cursando"
              checked={exp.completed}
              onChange={(checked) => handleChange(index, "completed", checked)}
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
              Remover curso
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
        Adicionar novo curso
      </a>
    </div>
  );
}
