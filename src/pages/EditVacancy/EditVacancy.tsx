import "./EditVacancy.css";
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
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import CustomInputNumber from "../../components/CustomInputNumber/CustomInputNumber";
import { saveVacancyService } from "../../services/saveVacancyService";
import CustomButtom from "../../components/CustomButtom/CustomButtom";
import { getVacancyById } from "../../services/getVacancyById";
import {
  EditVacancyType,
  defaultEditVacancy,
  validationEditVacancyPayload,
} from "../../types/EditVacancyType";
import { editVacancyService } from "../../services/editVacancyService";

export default function EditVacancy() {
  const { token } = useAuth();
  const { id } = useParams()
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [editVacancyPayload, setEditVacancyPayload] =
    useState<EditVacancyType>({
      ...defaultEditVacancy,
    });

  const handleCreateVacancyChange = (
    field: keyof EditVacancyType,
    value: string | number | null
  ) => {
    setEditVacancyPayload((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnderecoChange = (
    field: keyof EditVacancyType["endereco"],
    value: string
  ) => {
    setEditVacancyPayload((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [field]: value,
      },
    }));
  };

  const { endereco, fetchAddress, setEndereco } = useViaCep();

  const openVacancyOptions = [
    { label: "Aberta", value: 1 },
    { label: "Fechada", value: 0 },
  ];

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

  const handleEditVacancy = async () => {

    setValidationErrors({});

    try {
      validationEditVacancyPayload.parse(editVacancyPayload);
      const res = await editVacancyService(editVacancyPayload, token || "", id || "");

      toast.success("Vaga editada com sucesso!");
      navigate("/overview");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          toast.error(err.message)
          fieldErrors[path] = err.message;
        });

        setValidationErrors(fieldErrors);

        // toast.error("Verifique os campos obrigatórios.");
        console.error("Erros de validação:", error);
        return;
      }

      toast.error("Ocorreu um erro ao salvar.");
      console.error("Erro no envio:", error);
    }
  };

  useEffect(() => {
    const fetchVacancy = async () => {
      const result = await getVacancyById(
        id || ""
      ); 
      if (result) {
        setEditVacancyPayload(result);
      }
    };

    fetchVacancy();
  }, []);

  return (
    <>
      <Header />
      <div className="my-resume">
        <div className="info-my-resume">
          <h1>Editar Vaga</h1>
          <p>Insira as informações necessárias para editar a vaga</p>
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
                    editVacancyPayload.titulo != null
                      ? editVacancyPayload.titulo
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
                    editVacancyPayload.cargo != null
                      ? editVacancyPayload.cargo
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
                  value={editVacancyPayload.descricao}
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
                  value={editVacancyPayload.atividades}
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
                  value={editVacancyPayload.diferenciais}
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
                  value={editVacancyPayload.beneficios}
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
                  value={editVacancyPayload.regimeTrabalho}
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
                  value={editVacancyPayload.horarioTrabalho}
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
                  value={editVacancyPayload.tipoContratacao}
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
                  value={editVacancyPayload.salario}
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
                  value={editVacancyPayload.endereco.cep}
                  setValue={(value) => handleEnderecoChange("cep", value)}
                  type="text"
                  onBlur={async () => {
                    const result = await fetchAddress(
                      editVacancyPayload.endereco.cep
                    );

                    if (result) {
                      setEditVacancyPayload((prev) => ({
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
                    editVacancyPayload.endereco.rua != null
                      ? editVacancyPayload.endereco.rua
                      : endereco.rua
                  }
                  onChange={(e) => handleEnderecoChange("rua", e.target.value)}
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
                    editVacancyPayload.endereco.bairro != null
                      ? editVacancyPayload.endereco.bairro
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
                  value={editVacancyPayload.endereco.numero}
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
                    editVacancyPayload.endereco.cidade != null
                      ? editVacancyPayload.endereco.cidade
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
                    editVacancyPayload.endereco.uf != null
                      ? editVacancyPayload.endereco.uf
                      : endereco.estado
                  }
                  onChange={(e) => handleEnderecoChange("uf", e.target.value)}
                  error="Estado é obrigatório"
                  required={true}
                  placeholder="Insira seu Estado"
                />
              </div>
            </div>
            <br />
          </CustomPanel>

          <CustomPanel header="Status da vaga" toggleable>
            <CustomDropdown
              id={"status"}
              label="Status da vaga"
              value={editVacancyPayload.status}
              options={openVacancyOptions}
              placeholder="Selecione"
              error="Tipo de Contratação é obrigatório"
              required={true}
              onChange={(e) =>
                handleCreateVacancyChange("status", e.value)
              }
            />
          </CustomPanel>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.6rem",
              justifyContent: "flex-end",
            }}
          >
            <CustomButtom
              text="Cancelar"
              color="#929090"
              onClick={() => {
                navigate("/overview");
              }}
            />

            <CustomButtom
              text="Salvar"
              color="#00A8EA"
              onClick={() => {
                handleEditVacancy();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
