import "./MyApplications.css";
import Header from "../../components/Header/Header";

export default function MyApplications() {

  return (
    <>
      <Header />
      <div className="my-applications">
        <div className="info-my-applications">
          <h1>Minhas Candidaturas</h1>
          <p>
            Confira as informações e o progresso de suas candidaturas
          </p>
        </div>

        <div className="main-my-applications"></div>
      </div>
    </>
  );
}
