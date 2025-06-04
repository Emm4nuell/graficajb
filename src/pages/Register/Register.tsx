import React, { useState } from "react";
import "./Register.css";
import CustomInputText from "../../components/CustomInputText/CustomInputText";
import ButtomBlue from "../../components/ButtomBlue/ButtomBlue";
import { Link } from "react-router-dom";
import { defaultRegister, RegisterType } from "../../types/RegisterType";
export default function RegisterPage() {
  const [register, setRegister] = useState<RegisterType>(defaultRegister);
  const handlerChange = (field: keyof RegisterType, value: string) => {
    setRegister((prev) => ({ ...prev, [field]: value }));
    console.log(register);
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
              type_input={"text"}
              label={"Nome"}
              value={register.nome}
              onChange={(e) => handlerChange("nome", e.target.value)}
              placeholder={"Insira seu nome"}
            ></CustomInputText>
            <CustomInputText
              type_input={"text"}
              label={"Sobrenome"}
              value={register.sobrenome}
              onChange={(e) => handlerChange("sobrenome", e.target.value)}
              placeholder={"Insira seu sobrenome"}
            ></CustomInputText>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CustomInputText
              type_input={"email"}
              label={"Email"}
              value={register.email}
              onChange={(e) => handlerChange("email", e.target.value)}
              placeholder={"Insira seu email"}
            ></CustomInputText>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CustomInputText
              type_input={"password"}
              label={"Senha"}
              value={register.senha}
              onChange={(e) => handlerChange("senha", e.target.value)}
              placeholder={"Insira sua senha"}
            ></CustomInputText>
          </div>
          <ButtomBlue text_button="Criar Conta"></ButtomBlue>
        </form>
      </section>
    </div>
  );
}
