import "./CreateVacancy.css";
import Header from "../../components/Header/Header";
import CustomPanel from "../../components/CustomPanel/CustomPanel";
import CustomInputTextPrime from "../../components/CustomInputTextPrime/CustomInputTextPrime";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import CustomCalendar from "../../components/CustomCalendar/CustomCalendar";
import ButtomBlue from "../../components/ButtomBlue/ButtomBlue";
import { useEffect, useState } from "react";
import { useViaCep } from "../../hooks/useViaCep";
import { useAuth } from "../../contexts/AuthContext";
import CustomInputMask from "../../components/CustomInputMask/CustomInputMask";
import { toCapitalize } from "../../utils/toCapitalize";
import {
  ProfilePayloadType,
  defaultProfilePayload,
  validationProfilePayload,
} from "../../types/ProfileType";
import { savePerfilService } from "../../services/saveProfileService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomInputNumber from "../../components/CustomInputNumber/CustomInputNumber";

export default function CreateVacancy() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [salario, setSalario] = useState(null)
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [profilePayload, setProfilePayload] = useState<ProfilePayloadType>({
    ...defaultProfilePayload,
    idUsuario: user?.id || "",
  });

  const handleRootChange = (field: keyof ProfilePayloadType, value: string) => {
    setProfilePayload((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUserPessoalChange = (
    field: keyof ProfilePayloadType["userPessoal"],
    value: string | Date | null
  ) => {
    setProfilePayload((prev) => ({
      ...prev,
      userPessoal: {
        ...prev.userPessoal,
        nome: user?.nome || "",
        email: user?.email || "",
        [field]: value,
      },
    }));
  };

  const handlePerfilPessoalChange = (
    field: keyof ProfilePayloadType["perfilPessoal"],
    value: string | number | boolean | null
  ) => {
    setProfilePayload((prev) => ({
      ...prev,
      perfilPessoal: {
        ...prev.perfilPessoal,
        [field]: value,
      },
    }));
  };

  const { endereco, fetchAddress, setEndereco } = useViaCep();

  const affirmativeVacanciesOptions = [
    { label: "Sim", value: true },
    { label: "Não", value: false },
  ];

  const raceOptions = [
    { label: "Branca", value: 1 },
    { label: "Preta", value: 2 },
    { label: "Parda", value: 3 },
    { label: "Amarela", value: 4 },
    { label: "Indígena", value: 5 },
    { label: "Não desejo declarar", value: 6 },
    { label: "Outra", value: 7 },
  ];

  const sexualOrientationOptions = [
    { label: "Masculino", value: 1 },
    { label: "Feminino", value: 2 },
    { label: "Outro", value: 3 },
  ];

  const handleProfile = async () => {
    console.log(profilePayload);

    // Limpa erros antigos
    setValidationErrors({});

    try {
      // Valida
      validationProfilePayload.parse(profilePayload);

      // Se chegou aqui, payload é válido, pode enviar
      const res = await savePerfilService(profilePayload, token);

      toast.success("Dados salvos com sucesso!");
      navigate("/overview");
    } catch (error) {
      // Se for erro de validação Zod
      if (error instanceof z.ZodError) {
        // Mapeia erros em objeto { caminho: mensagem }
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          fieldErrors[path] = err.message;
        });

        setValidationErrors(fieldErrors);

        toast.error("Verifique os campos obrigatórios.");
        console.error("Erros de validação:", error);
        return; // ⚠️ Não continua o envio
      }

      // Outros erros de API
      toast.error("Ocorreu um erro ao salvar.");
      console.error("Erro no envio:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setProfilePayload((prev) => ({
        ...prev,
        userPessoal: {
          ...prev.userPessoal,
          nome: toCapitalize(user.nome) || "",
          email: user.email || "",
        },
      }));
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className="my-resume">
        <div className="info-my-resume">
          <h1>Criar Vaga</h1>
          <p>Insira as informações necessárias para a criação da vaga</p>
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
                  id="titulo"
                  label="Título"
                  value={
                    profilePayload.userPessoal.nome != null
                      ? profilePayload.userPessoal.nome
                      : toCapitalize(user?.nome)
                  }
                  onChange={(e) =>
                    handleUserPessoalChange("nome", e.target.value)
                  }
                  error="Título é obrigatório"
                  placeholder="Insira o título"
                  required={true}
                />

                <CustomInputTextPrime
                  id="cargo"
                  label="Cargo"
                  type="text"
                  value={
                    profilePayload.userPessoal.email != null
                      ? profilePayload.userPessoal.email
                      : user?.email
                  }
                  onChange={(e) =>
                    handleUserPessoalChange("email", e.target.value)
                  }
                  error="Cargo é obrigatório"
                  required={true}
                  placeholder="exemplo@email.com"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.6rem",
                }}
              >
                <CustomTextArea
                  label="Descrição"
                  value={profilePayload.perfilPessoal.sobreMim}
                  onChange={(e) =>
                    handlePerfilPessoalChange("sobreMim", e.target.value)
                  }
                  placeholder="Digite seu texto aqui..."
                  error={"Este campo é obrigatório"}
                  required={true}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.6rem",
                }}
              >
                <CustomTextArea
                  label="Responsabilidade e Atribuições"
                  value={profilePayload.perfilPessoal.sobreMim}
                  onChange={(e) =>
                    handlePerfilPessoalChange("sobreMim", e.target.value)
                  }
                  placeholder="Digite seu texto aqui..."
                  error={"Este campo é obrigatório"}
                  required={true}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.6rem",
                }}
              >
                <CustomTextArea
                  label="Diferenciais"
                  value={profilePayload.perfilPessoal.sobreMim}
                  onChange={(e) =>
                    handlePerfilPessoalChange("sobreMim", e.target.value)
                  }
                  placeholder="Digite seu texto aqui..."
                  error={"Este campo é obrigatório"}
                  required={true}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.6rem",
                }}
              >
                <CustomTextArea
                  label="Benefícios"
                  value={profilePayload.perfilPessoal.sobreMim}
                  onChange={(e) =>
                    handlePerfilPessoalChange("sobreMim", e.target.value)
                  }
                  placeholder="Digite seu texto aqui..."
                  error={"Este campo é obrigatório"}
                  required={true}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1.6rem",
                }}
              >
                <CustomDropdown
                  id={"regime"}
                  label="Regime de Trabalho"
                  value={profilePayload.perfilPessoal.corRaca}
                  options={raceOptions}
                  placeholder="Selecione"
                  error="Regime de Trabalho é obrigatório"
                  required={true}
                  onChange={(e) =>
                    handlePerfilPessoalChange("corRaca", e.value)
                  }
                />


                <CustomInputTextPrime
                  id="jornada"
                  label="Jornada de Trabalho"
                  type="text"
                  value={
                    profilePayload.userPessoal.email != null
                      ? profilePayload.userPessoal.email
                      : user?.email
                  }
                  onChange={(e) =>
                    handleUserPessoalChange("email", e.target.value)
                  }
                  error="Cargo é obrigatório"
                  required={true}
                  placeholder="exemplo@email.com"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1.6rem",
                }}
              >
                <CustomDropdown
                  id={"tipo"}
                  label="Tipo de Contratação"
                  value={profilePayload.perfilPessoal.corRaca}
                  options={raceOptions}
                  placeholder="Selecione"
                  error="Tipo de Contratação é obrigatório"
                  required={true}
                  onChange={(e) =>
                    handlePerfilPessoalChange("corRaca", e.value)
                  }
                />

                <CustomInputNumber
                  id="salario"
                  label="Salário"
                  value={salario}
                  required={true}
                  error="Salário é obrigatório"
                />
              </div>
            </div>
            <br />
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
                  value={profilePayload.perfilPessoal.enderecoCEP}
                  setValue={(value) =>
                    handlePerfilPessoalChange("enderecoCEP", value)
                  }
                  type="text"
                  onBlur={async () => {
                    const result = await fetchAddress(
                      profilePayload.perfilPessoal.enderecoCEP
                    );

                    if (result) {
                      setProfilePayload((prev) => ({
                        ...prev,
                        perfilPessoal: {
                          ...prev.perfilPessoal,
                          enderecoBairro: result.bairro || null,
                          enderecoCidade: result.cidade || null,
                          enderecoEstado: result.estado || null,
                          enderecoRua: result.rua || null,
                          enderecoCEP: result.cep,
                        },
                      }));
                    }
                  }}
                  mask="99999-999"
                  error="CEP é obrigatório"
                  required={true}
                  placeholder="Insira seu CEP"
                />

                <CustomInputTextPrime
                  id="endereco"
                  label="Rua"
                  value={
                    profilePayload.perfilPessoal.enderecoRua != null
                      ? profilePayload.perfilPessoal.enderecoRua
                      : endereco.rua
                  }
                  onChange={(e) =>
                    handlePerfilPessoalChange("enderecoRua", e.target.value)
                  }
                  error="Rua é obrigatório"
                  required={true}
                  placeholder="Insira seu endereço"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="bairro"
                  label="Bairro"
                  value={
                    profilePayload.perfilPessoal.enderecoBairro != null
                      ? profilePayload.perfilPessoal.enderecoBairro
                      : endereco.bairro
                  }
                  onChange={(e) =>
                    handlePerfilPessoalChange("enderecoBairro", e.target.value)
                  }
                  error="Bairro é obrigatório"
                  required={true}
                  placeholder="Insira seu bairro"
                />

                <CustomInputTextPrime
                  id="numero"
                  label="Número"
                  value={profilePayload.perfilPessoal.enderecoNumero}
                  onChange={(e) =>
                    handlePerfilPessoalChange("enderecoNumero", e.target.value)
                  }
                  error="Número é obrigatório"
                  required={true}
                  placeholder="Insira o número do seu logradouro"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "1.6rem" }}
              >
                <CustomInputTextPrime
                  id="cidade"
                  label="Cidade"
                  value={
                    profilePayload.perfilPessoal.enderecoCidade != null
                      ? profilePayload.perfilPessoal.enderecoCidade
                      : endereco.cidade
                  }
                  onChange={(e) =>
                    handlePerfilPessoalChange("enderecoCidade", e.target.value)
                  }
                  error="Cidade é obrigatório"
                  required={true}
                  placeholder="Insira sua cidade"
                />

                <CustomInputTextPrime
                  id="estado"
                  label="Estado"
                  value={
                    profilePayload.perfilPessoal.enderecoEstado != null
                      ? profilePayload.perfilPessoal.enderecoEstado
                      : endereco.estado
                  }
                  onChange={(e) =>
                    handlePerfilPessoalChange("enderecoEstado", e.target.value)
                  }
                  error="Estado é obrigatório"
                  required={true}
                  placeholder="Insira seu Estado"
                />
              </div>
            </div>
            <br />
          </CustomPanel>

          <ButtomBlue text_button="Salvar" onClick={() => handleProfile()} />
        </div>
      </div>
    </>
  );
}
