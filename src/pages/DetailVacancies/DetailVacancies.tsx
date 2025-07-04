import Header from "../../components/Header/Header";
import "./DetailVacancies.css";

export default function DetailVacancies() {
  return (
    <>
      <Header />
      <div className="detail-vacancies">
        <div className="info-title-page-detail-vacancies">
          <span>Vaga</span>
          <h1>Senior Java Developer</h1>
        </div>

        <div className="info-detail-vacancies">
          <h1 className="info-title-detail-vacancies">Title</h1>
          <p className="info-desc-detail-vacancies">Title</p>
        </div>

        <div className="info-detail-vacancies">
          <h1 className="info-title-detail-vacancies">Sobre a Gráfica JB</h1>
          <p className="info-desc-detail-vacancies">
            Em julho de 1983 surgiu em João Pessoa a Gráfica JB, pequena e
            modesta, mas com um grande potencial. Ao longo dos anos se
            desenvolveu e traçou novos caminhos, sempre oferecendo qualidade e
            agilidade como diferencial. Atualmente atende em todo o Nordeste e
            destaca-se pelo relacionamento e compromisso com os clientes.
            <br />
            <br />A sede atual conta com um parque gráfico de mais de 8.000 m²
            no coração da capital paraibana, que proporciona o fácil acesso para
            clientes e facilita a logística. Com investimentos contínuos em
            tecnologia e qualificação, a Gráfica JB consolidou-se no mercado e é
            uma das maiores gráficas planas do país. Nos últimos anos uma nova
            JB vem surgindo, realinhando seus processos e serviços. O mercado
            vem passando por transformações e a JB vem acompanhando esse ritmo.
          </p>
        </div>
      </div>
    </>
  );
}
