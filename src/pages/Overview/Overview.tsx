import "./Overview.css";
import Header from "../../components/Header/Header";
import { useAuth } from "../../contexts/AuthContext";
import { toCapitalize } from "../../utils/toCapitalize";
import CustomPanel from "../../components/CustomPanel/CustomPanel";
export default function OverviewPage() {
  const { user, perfilCandidato } = useAuth();

  return (
    <>
      <Header />
      <div className="overview">
        <div className="info-title-page-overview">
          <span>Olá</span>
          <h1>{toCapitalize(user?.nome)}</h1>
          <h3>Seja bem-vindo ao portal de candidaturas da Gráfica JB</h3>
        </div>
        <br />
        {perfilCandidato ? (
          <>
            <CustomPanel header="Venha fazer parte do nosso time!" toggleable>
              <div className="info-overview">
                <p className="info-desc-overview">
                  Para superar nossos desafios, contamos com o comprometimento
                  de diferentes profissionais. Valorizamos nossos colaboradores
                  através de oportunidades de progressão na carreira, além de
                  treinamentos e cursos para uma formação contínua.
                  <br />
                  Somos uma empresa regional, com sede em João Pessoa.
                  Oferecemos oportunidades de carreira através de programas de
                  recrutamento e capacitação profissional para os nossos
                  diferentes negócios. Veja qual oportunidade é a mais adequada
                  ao seu perfil profissional e venha fazer parte do nosso time
                </p>
              </div>
            </CustomPanel>
          </>
        ) : (
          <>
            <CustomPanel header="Caro recrutador" toggleable>
              <div className="info-overview">
                <p className="info-desc-overview">
                  Aqui você pode gerenciar suas oportunidades, acompanhar
                  candidaturas e encontrar os talentos ideais para fortalecer
                  o nosso time. Conte com nossa plataforma para agilizar seu
                  processo seletivo e criar conexões que impulsionam resultados.
                </p>
                <br />
                <b>Desejamos ótimas contratações!</b>
              </div>
            </CustomPanel>
          </>
        )}
        <br/>
        <CustomPanel header="Conheça mais sobre a Gráfica JB" toggleable>
          <div className="info-overview">
            <p className="info-desc-overview">
              Em julho de 1983 surgiu em João Pessoa a Gráfica JB, pequena e
              modesta, mas com um grande potencial. Ao longo dos anos se
              desenvolveu e traçou novos caminhos, sempre oferecendo qualidade e
              agilidade como diferencial. Atualmente atende em todo o Nordeste e
              destaca-se pelo relacionamento e compromisso com os clientes.
              <br />
              <br />A sede atual conta com um parque gráfico de mais de 8.000 m²
              no coração da capital paraibana, que proporciona o fácil acesso
              para clientes e facilita a logística. Com investimentos contínuos
              em tecnologia e qualificação, a Gráfica JB consolidou-se no
              mercado e é uma das maiores gráficas planas do país. Nos últimos
              anos uma nova JB vem surgindo, realinhando seus processos e
              serviços. O mercado vem passando por transformações e a JB vem
              acompanhando esse ritmo.
            </p>
          </div>
        </CustomPanel>
        <br />
      </div>
    </>
  );
}
