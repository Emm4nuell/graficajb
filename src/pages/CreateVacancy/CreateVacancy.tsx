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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomInputNumber from "../../components/CustomInputNumber/CustomInputNumber";
import { CreateVacancyType, defaultCreateVacancy, ValidationCreateVacancy, validationCreateVacancyPayload } from "../../types/CreateVacancyType";
import { saveVacancyService } from "../../services/saveVacancyService";

export default function CreateVacancy() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [createVacancyPayload, setCreateVacancyPayload] = useState<CreateVacancyType>({
    ...defaultCreateVacancy,
  });

  const handleCreateVacancyChange = (
    field: keyof CreateVacancyType,
    value: string | number | null
  ) => {
    setCreateVacancyPayload((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnderecoChange = (
    field: keyof CreateVacancyType["endereco"],
    value: string 
  ) => {
    setCreateVacancyPayload((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [field]: value,
      },
    }));
  };

  const { endereco, fetchAddress, setEndereco } = useViaCep();

  const workingDayOptions = [
    { label: "6x1", value: "6x1" },
    { label: "5x2", value: "5x2" },
    { label: "4x3", value: "4x3" },
    { label: "A combinar", value: "A combinar" },
  ];

  const workRegimeOptions = [
    { label: "Presencial", value: "Presencial" },
    { label: "Remoto", value: "Remoto" },
    { label: "Híbrido", value: "Híbrido" },
  ];

  const typeOfHiringOptions = [
    { label: "CLT", value: "CLT" },
    { label: "PJ", value: "PJ" },
    { label: "Estágio", value: "Estágio" },
  ];

  const handleCreateVacancy = async () => {
    console.log(createVacancyPayload);

    // Limpa erros antigos
    setValidationErrors({});

    try {
      // Valida
      validationCreateVacancyPayload.parse(createVacancyPayload);

      // Se chegou aqui, payload é válido, pode enviar
      const res = await saveVacancyService(createVacancyPayload, token);

      toast.success("Vaga criada com sucesso!");
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
        return; 
      }

      toast.error("Ocorreu um erro ao salvar.");
      console.error("Erro no envio:", error);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     setCreateVacancyPayload((prev) => ({
  //       ...prev,
  //       userPessoal: {
  //         ...prev.userPessoal,
  //         nome: toCapitalize(user.nome) || "",
  //         email: user.email || "",
  //       },
  //     }));
  //   }
  // }, [user]);

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
                    createVacancyPayload.titulo != null
                      ? createVacancyPayload.titulo
                      : "Titulo"
                  }
                  onChange={(e) =>
                    handleCreateVacancyChange("titulo", e.target.value)
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
                    createVacancyPayload.cargo != null
                      ? createVacancyPayload.cargo
                      : "Cargo"
                  }
                  onChange={(e) =>
                    handleCreateVacancyChange("cargo", e.target.value)
                  }
                  error="Cargo é obrigatório"
                  required={true}
                  placeholder="Insira o cargo"
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
                  value={createVacancyPayload.descricao}
                  onChange={(e) =>
                    handleCreateVacancyChange("descricao", e.target.value)
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
                  value={createVacancyPayload.atividades}
                  onChange={(e) =>
                    handleCreateVacancyChange("atividades", e.target.value)
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
                  value={createVacancyPayload.diferenciais}
                  onChange={(e) =>
                    handleCreateVacancyChange("diferenciais", e.target.value)
                  }
                  placeholder="Digite seu texto aqui..."
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
                  value={createVacancyPayload.beneficios}
                  onChange={(e) =>
                    handleCreateVacancyChange("beneficios", e.target.value)
                  }
                  placeholder="Digite seu texto aqui..."
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
                  value={createVacancyPayload.regimeTrabalho}
                  options={workRegimeOptions}
                  placeholder="Selecione"
                  error="Regime de Trabalho é obrigatório"
                  required={true}
                  onChange={(e) =>
                    handleCreateVacancyChange("regimeTrabalho", e.value)
                  }
                />

                <CustomDropdown
                  id={"jornada"}
                  label="Jornada de Trabalho"
                  value={createVacancyPayload.horarioTrabalho}
                  options={workingDayOptions}
                  placeholder="Selecione"
                  onChange={(e) =>
                    handleCreateVacancyChange("horarioTrabalho", e.value)
                  }
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
                  value={createVacancyPayload.tipoContratacao}
                  options={typeOfHiringOptions}
                  placeholder="Selecione"
                  error="Tipo de Contratação é obrigatório"
                  required={true}
                  onChange={(e) =>
                    handleCreateVacancyChange("tipoContratacao", e.value)
                  }
                />

                <CustomInputNumber
                  id="salario"
                  label="Salário"
                  value={createVacancyPayload.salario}
                  onChange={(e) =>
                    handleCreateVacancyChange("salario", e.value)
                  }
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
                  value={createVacancyPayload.endereco.cep}
                  setValue={(value) =>
                    handleEnderecoChange("cep", value)
                  }
                  type="text"
                  onBlur={async () => {
                    const result = await fetchAddress(
                      createVacancyPayload.endereco.cep
                    );

                    if (result) {
                      setCreateVacancyPayload((prev) => ({
                        ...prev,
                        endereco: {
                          ...prev.endereco,
                          bairro: result.bairro,
                          cidade: result.cidade,
                          uf: result.estado,
                          rua: result.rua,
                          cep: result.cep,
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
                    createVacancyPayload.endereco.rua != null
                      ? createVacancyPayload.endereco.rua
                      : endereco.rua
                  }
                  onChange={(e) =>
                    handleEnderecoChange("rua", e.target.value)
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
                    createVacancyPayload.endereco.bairro != null
                      ? createVacancyPayload.endereco.bairro
                      : endereco.bairro
                  }
                  onChange={(e) =>
                    handleEnderecoChange("bairro", e.target.value)
                  }
                  error="Bairro é obrigatório"
                  required={true}
                  placeholder="Insira seu bairro"
                />

                <CustomInputTextPrime
                  id="numero"
                  label="Número"
                  value={createVacancyPayload.endereco.numero}
                  onChange={(e) =>
                    handleEnderecoChange("numero", e.target.value)
                  }
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
                    createVacancyPayload.endereco.cidade != null
                      ? createVacancyPayload.endereco.cidade
                      : endereco.cidade
                  }
                  onChange={(e) =>
                    handleEnderecoChange("cidade", e.target.value)
                  }
                  error="Cidade é obrigatório"
                  required={true}
                  placeholder="Insira sua cidade"
                />

                <CustomInputTextPrime
                  id="estado"
                  label="Estado"
                  value={
                    createVacancyPayload.endereco.uf != null
                      ? createVacancyPayload.endereco.uf
                      : endereco.estado
                  }
                  onChange={(e) =>
                    handleEnderecoChange("uf", e.target.value)
                  }
                  error="Estado é obrigatório"
                  required={true}
                  placeholder="Insira seu Estado"
                />
              </div>
            </div>
            <br />
          </CustomPanel>

          <ButtomBlue text_button="Salvar" onClick={() => handleCreateVacancy()} />
        </div>
      </div>
    </>
  );
}
