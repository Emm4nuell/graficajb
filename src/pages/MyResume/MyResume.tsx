import "./MyResume.css";
import Header from "../../components/Header/Header";
import CustomPanel from "../../components/CustomPanel/CustomPanel";
import CustomInputTextPrime from "../../components/CustomInputTextPrime/CustomInputTextPrime";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox";
import { useState } from "react";

export default function MyResumePage() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [date, setDate] = useState<Date | null>(null)
  const [error, setError] = useState("");

  const [perfil, setPerfil] = useState<string>("");

  const options = [
    { label: "Candidato", value: "CANDIDATO" },
    { label: "Recrutador", value: "RECRUTADOR" },
  ];

  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const cities = [
    { label: 'Emprego Atual', value: 'emprego_atual' }
  ];

  return (
    <>
      <Header />
      <div className="my-resume">
        <div className="info-my-resume">
          <h1>Meu Currículo</h1>
          <p>
            Aqui estão seus dados pessoais, profissionais, acadêmicos e suas
            habilidades
          </p>
        </div>

        <div className="main-my-resume">
          <CustomPanel header="Dados Pessoais" toggleable>
            <span className="title-panel">Endereço</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="cep"
                  label="CEP"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  error={error}
                  placeholder="Insira seu CEP"
                />

                <CustomInputTextPrime
                  id="endereco"
                  label="Endereço"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  error={error}
                  placeholder="Insira seu endereço"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomDropdown
                  id="estado"
                  label="Estado"
                  value={perfil}
                  options={options}
                  onChange={(e) => setPerfil(e.value)}
                  placeholder="Selecione seu estado"
                />

                <CustomDropdown
                  id="cidade"
                  label="Cidade"
                  value={perfil}
                  options={options}
                  onChange={(e) => setPerfil(e.value)}
                  placeholder="Selecione sua cidade"
                />
              </div>
            </div>

            <span className="title-panel">Redes Sociais</span>
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
                  id="linkedin"
                  label="Linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  error={error}
                  placeholder="Link do Linkedin"
                />

                <CustomInputTextPrime
                  id="instagram"
                  label="Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  error={error}
                  placeholder="Link do Instagram"
                />
              </div>
            </div>
          </CustomPanel>

          <CustomPanel header="Dados Profissionais" toggleable>
            <span className="title-panel">Experiência</span>
            <p className="p-panel">
              Essas informações serão usadas em todas as candidaturas
            </p>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="empresa"
                  label="Empresa"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  error={error}
                  placeholder="Insira seu CEP"
                />

                <CustomInputTextPrime
                  id="cargo"
                  label="Cargo"
                  value={nome}
                  onChange={(e) => setEndereco(e.target.value)}
                  error={error}
                  placeholder="Insira seu endereço"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >

                <CustomCalendar
                    id="data"
                    label="Data Início"
                    value={date}
                    onChange={(e) => setDate(e.value as Date)}
                    placeholder="Selecione uma data"
                    error={error}
                    showIcon
                  />

                <CustomCalendar
                    id="data"
                    label="Data Fim"
                    value={date}
                    onChange={(e) => setDate(e.value as Date)}
                    placeholder="Selecione uma data"
                    error={error}
                    showIcon
                  />
              </div>

              {/* <CustomCheckbox
                label=""
                options={cities}
                multiple
                value={selectedCities}
                onChange={(val) => setSelectedCities(val)}
              /> */}
            </div>
          </CustomPanel>
          <CustomPanel header="Dados Acadêmicos" toggleable></CustomPanel>
          <CustomPanel header="Habilidades" toggleable></CustomPanel>
        </div>
      </div>
    </>
  );
}
