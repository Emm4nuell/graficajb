import React from "react";
import "./Register.css";
import CustomInputText from "../../components/CustomInputText/CustomInputText";
import ButtomBlue from "../../components/ButtomBlue/ButtomBlue";
export default function RegisterPage() {
  return (
    <body id="body-register">
      <section id="section-register">
        <div id="info-register">
          <span>COMECE GRATUITAMENTE</span>
          <h1>Crie uma nova conta</h1>
          <p>
            Já posssui uma conta? <a href="#">Faça login</a>
          </p>
        </div>

        <div
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
              placeholder={"Insira seu nome"}
            ></CustomInputText>
            <CustomInputText
              type_input={"text"}
              label={"Sobrenome"}
              placeholder={"Insira seu sobrenome"}
            ></CustomInputText>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CustomInputText
              type_input={"email"}
              label={"Email"}
              placeholder={"Insira seu email"}
            ></CustomInputText>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CustomInputText
              type_input={"password"}
              label={"Senha"}
              placeholder={"Insira sua senha"}
            ></CustomInputText>
          </div>
          <ButtomBlue text_button="Criar Conta"></ButtomBlue>
        </div>
      </section>
    </body>
  );
}
