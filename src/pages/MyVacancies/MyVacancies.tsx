import "./MyVacancies.css";
import Header from "../../components/Header/Header";

export default function MyVacancies() {

  return (
    <>
      <Header />
      <div className="my-vacancies">
        <div className="info-my-vacancies">
          <h1>Minhas Vagas</h1>
          <p>
            Confira as vagas que foram salvas por você
          </p>
        </div>

        <div className="main-my-vacancies"></div>
      </div>
    </>
  );
}
