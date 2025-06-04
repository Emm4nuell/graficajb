import ButtomBlue from "../../components/ButtomBlue/ButtomBlue";
import CustomInputText from "../../components/CustomInputText/CustomInputText";
import "./SignIn.css";
export default function SignInPage() {
  return (
    <body id="body-signin">
      <section id="section-signin">
        <div id="info-signin">
          <h1>Entrar</h1>
          <p>
            Ainda não possui uma conta? <a href="#">Cadastre-se</a>
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
          <a href="#">Esqueceu a senha?</a>
          <ButtomBlue text_button="Criar Conta"></ButtomBlue>
        </div>
      </section>
    </body>
  );
}
