import CustomInputTextPrime from "../../components/CustomInputTextPrime/CustomInputTextPrime";
import CustomPanel from "../../components/CustomPanel/CustomPanel";
import Header from "../../components/Header/Header";
import "./DetailVacancies.css";

export default function DetailVacancies() {
  return (
    <>
      <Header />
      <div className="my-resume">
        <div className="info-my-resume">
          <h1>Criar Vaga</h1>
          <p>Insira as informações necessárias para a criação da vaga</p>
        </div>
      </div>
    </>
  );
}
