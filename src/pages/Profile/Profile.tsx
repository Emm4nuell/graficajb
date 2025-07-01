import "./Profile.css";
import Header from "../../components/Header/Header";
import CustomPanel from "../../components/CustomPanel/CustomPanel";
import CustomInputTextPrime from "../../components/CustomInputTextPrime/CustomInputTextPrime";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import ButtomBlue from "../../components/ButtomBlue/ButtomBlue"
import { useState } from "react";
import { useViaCep } from "../../hooks/useViaCep";
import { useAuth } from "../../contexts/AuthContext";
import InterestAreaForm, { InterestArea } from "../../components/InterestAreaForm/InterestAreaForm";
import CustomInputMask from "../../components/CustomInputMask/CustomInputMask";

export default function Profile() {
  const { token } = useAuth()
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [cep, setCep] = useState("");
  const { endereco, fetchAddress, setEndereco } = useViaCep();
  const [textValueCurriculum, setTextValueCurriculum] = useState<string>("");
  const [textValueAboutMe, setTextValueAboutMe] = useState<string>("");
  const [affirmativeVacancies, setAffirmativeVacancies] = useState<string>("");
  const [race, setRace] = useState<string>("");
  const [areaActivity, setAreaActivity] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [completedAcademy, setCompletedAcademy] = useState<boolean>(false);

  const affirmativeVacanciesOptions = [
    { label: "Sim", value: true },
    { label: "Não", value: false },
  ]

  const raceOptions = [
    { label: "Branca", value: 0 },
    { label: "Preta", value: 1 },
    { label: "Parda", value: 2 },
    { label: "Amarela", value: 3 },
    { label: "Indígena", value: 4 },
    { label: "Não desejo declarar", value: 5 },
    { label: "Outra", value: 6 }
  ]

  const payload = {
    idUsuario: "",
    usuario: {
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: ""
    },
    perfilPessoal: {
      classificacaoAfirmativa: "",
      corRaca: "",
      orientacaoSexual: "",
      sobreMim: textValueAboutMe,
      enderecoBairro: endereco.bairro,
      enderecoCEP: cep,
      enderecoCidade: endereco.localidade,
      enderecoEstado: endereco.uf,
      enderecoNumero: numero,
      enderecoRua: endereco.logradouro,
    }
  };


  const savePerfil = async () => {
    try {
      const response = await fetch("https://sua.api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar dados.");
      }

      const data = await response.json();
      console.log("Salvo com sucesso:", data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Header />
      <div className="my-resume">
        <div className="info-my-resume">
          <h1>Perfil</h1>
          <p>
            Aqui estão os seus dados pessoais
          </p>
        </div>

        <div className="main-my-resume">
          <CustomPanel header="Dados Pessoais" toggleable>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="nome"
                  label="Nome Completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={() => fetchAddress(cep)}
                  error={error}
                  placeholder="Insira seu nome"
                />

                <CustomCalendar
                  id={"dateOfBirth"}
                  label="Data de Nascimento"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value ?? null)}
                  placeholder="Selecione uma data"
                  showIcon
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputMask
                  id="phone"
                  label="Telefone"
                  value={phone}
                  type="text"
                  setValue={setPhone}
                  mask="(99) 99999-9999"
                  placeholder="Digite o telefone"
                  error={error}
                />

                <CustomInputTextPrime
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  placeholder="exemplo@email.com"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomDropdown
                  id={"race"}
                  label="Raça"
                  value={race}
                  options={raceOptions}
                  onChange={(e) => setRace(e.target.value)}
                  placeholder="Selecione"
                />

                <CustomDropdown
                  id={"affirmativeVacancies"}
                  label="Aplica-se a vagas afirmativas?"
                  value={affirmativeVacancies}
                  options={affirmativeVacanciesOptions}
                  onChange={(e) => setAffirmativeVacancies(e.target.value)}
                  placeholder="Selecione"
                />
              </div>

            </div>
            <br/>
          </CustomPanel>

          <CustomPanel header="Endereço" toggleable>
            <p className="p-panel">
              Insira os dados sobre o local que você reside
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputMask
                  id="cep"
                  label="CEP"
                  value={phone}
                  type="cep"
                  setValue={setCep}
                  onBlur={() => fetchAddress(cep)}
                  mask="99999-999"
                  placeholder="Insira seu CEP"
                  error={error}
                />

                <CustomInputTextPrime
                  id="endereco"
                  label="Endereço"
                  value={endereco.logradouro}
                  onChange={(e) =>
                    setEndereco({ ...endereco, logradouro: e.target.value})
                  }
                  error={error}
                  placeholder="Insira seu endereço"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="bairro"
                  label="Bairro"
                  value={endereco.bairro}
                  onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value})}
                  error={error}
                  placeholder="Insira seu bairro"
                />

                <CustomInputTextPrime
                  id="numero"
                  label="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  error={error}
                  placeholder="Insira o número do seu logradouro"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="cidade"
                  label="Cidade"
                  value={endereco.localidade}
                  onChange={(e) => setEndereco({ ...endereco, localidade: e.target.value})}
                  error={error}
                  placeholder="Insira sua cidade"
                />

                <CustomInputTextPrime
                  id="estado"
                  label="Estado"
                  value={endereco.uf}
                  onChange={(e) => setEndereco({ ...endereco, uf: e.target.value})}
                  error={error}
                  placeholder="Insira seu Estado"
                />
              </div>

            </div>
            <br/>
          </CustomPanel>

          <CustomPanel header="Sobre mim" toggleable>
            <p className="p-panel">
              Insira uma descrição sobre você, seus hobbies e curiosidades pessoais
            </p>

            <CustomTextArea
              value={textValueAboutMe}
              onChange={(e) => setTextValueAboutMe(e.target.value)}
              placeholder="Digite seu texto aqui..."
              // error={textValueCurriculum == "" ? "Este campo é obrigatório" : undefined}
            />
          </CustomPanel>

          <ButtomBlue text_button="Salvar" onClick={() => savePerfil()}/>
        </div>
      </div>
    </>
  );
}
