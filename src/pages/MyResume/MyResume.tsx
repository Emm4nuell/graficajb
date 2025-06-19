import './MyResume.css'
import Header from '../../components/Header/Header';
import CustomPanel from '../../components/CustomPanel/CustomPanel';

export default function MyResumePage() {

  return (
    <>
      <Header/>
      <div className="my-resume">
        <div className="info-my-resume">
          <h1>Meu Currículo</h1>
          <p>Aqui estão seus dados pessoais, profissionais, acadêmicos e suas habilidades</p>
        </div>

        <div className="main-my-resume">
          <CustomPanel header="Dados Pessoais" toggleable></CustomPanel>
          <CustomPanel header="Dados Profissionais" toggleable></CustomPanel>
          <CustomPanel header="Dados Acadêmicos" toggleable></CustomPanel>
          <CustomPanel header="Habilidades" toggleable></CustomPanel>
        </div>
      </div>
    </>
  );
}
