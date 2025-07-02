import { useState } from "react";
import "./Register.css";
import CustomInputText from "../../components/CustomInputText/CustomInputText";
import ButtomBlue from "../../components/ButtomBlue/ButtomBlue";
import { Link, useNavigate } from "react-router-dom";
import { defaultRegister, RegisterType } from "../../types/RegisterType";
import CustomInputSelect from "../../components/CustomInputSelect/CustomInputSelect";
import { createUser } from "../../services/registerService";
import { toast } from "react-toastify";
export default function RegisterPage() {
  const [register, setRegister] = useState<RegisterType>(defaultRegister);
  const [perfil, setPerfil] = useState("");
  const navigate = useNavigate();
  const handlerChange = (field: keyof RegisterType, value: string) => {
    setRegister((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = async () => {
if(register.senha == register.repitaSenha){
    try {
      const res = await createUser(register);
      navigate("/signin")
      toast.success("Usuário cadastrado com sucesso")
    } catch (error: any) {
  const firstFieldError = error?.fieldErrors?.[0]?.message;
  const fallbackMessage = error?.message || "Erro ao criar conta";

  toast.error(firstFieldError || fallbackMessage);
}
}else{toast.error("As senhas não são iguais.")}

  };

  return (
    <div id="body-register">
      <section id="section-register">
        <div id="info-register">
          <span>COMECE GRATUITAMENTE</span>
          <h1>Crie uma nova conta</h1>
          <p>
            Já posssui uma conta? <Link to={"signin"}>Faça login</Link>
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "36rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", gap: "0.94rem" }}
          >
            <CustomInputText
              id="nome"
              type_input={"text"}
              label={"Nome"}
              value={register.nome}
              onChange={(e) => handlerChange("nome", e.target.value)}
              placeholder={"Insira seu nome"}
            ></CustomInputText>
            <CustomInputText
              id="tel"
              type_input={"tel"}
              label={"Telefone"}
              value={register.telefone}
              onChange={(e) => handlerChange("telefone", e.target.value)}
              placeholder={"Insira seu telefone"}
            ></CustomInputText>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CustomInputText
              id="email"
              type_input={"email"}
              label={"Email"}
              value={register.email}
              onChange={(e) => handlerChange("email", e.target.value)}
              placeholder={"Insira seu email"}
            ></CustomInputText>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "0.94rem" }}>
            <CustomInputText
              id="password"
              type_input={"password"}
              label={"Senha"}
              value={register.senha}
              onChange={(e) => handlerChange("senha", e.target.value)}
              placeholder={"Insira sua senha"}
            ></CustomInputText>
             <CustomInputText
              id="confirm-password"
              type_input={"password"}
              label={"Confirmar Senha"}
              value={register.repitaSenha}
              onChange={(e) => handlerChange("repitaSenha", e.target.value)}
              placeholder={"Confirme sua senha"}
            ></CustomInputText>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CustomInputSelect
              id="perfil"
              label="Perfil"
              value={perfil}
              selectLabel="Selecione qual o seu perfil"
              onChange={(e) => [setPerfil(e.target.value), handlerChange("perfil", e.target.value)]}
              options={[
                { value: "CANDIDATO", label: "Candidato" },
                { value: "RECRUTADOR", label: "Recrutador" }
              ]}
            ></CustomInputSelect>
          </div>
          <ButtomBlue text_button="Criar Conta" onClick={handleCreateAccount}></ButtomBlue>
        </form>
      </section>
    </div>
  );
}
