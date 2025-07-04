import CustomInputTextPrime from "../../components/CustomInputTextPrime/CustomInputTextPrime";
import CustomPanel from "../../components/CustomPanel/CustomPanel";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import Header from "../../components/Header/Header";
import "./CreateVacancy.css";

export default function CreateVacancyPage() {
  return (
    <>
      <Header />
      <div className="my-resume">
        <div className="info-my-resume">
          <h1>Criar Vaga</h1>
          <p>Insira as informações necessárias para a criação da vaga</p>
        </div>
        <CustomPanel header="Sobre a vaga" toggleable>
          <div style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}>
            <CustomInputTextPrime
              label="Títilo"
              placeholder="Insira o título da vaga"
            />

            <CustomInputTextPrime
              label="Cargo"
              placeholder="Insira o cargo da vaga"
            />
          </div>
        </CustomPanel>
      </div>
    </>
  );
}
