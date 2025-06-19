import React, { useState, useEffect } from "react";
import ButtomBlue from "../../components/ButtomBlue/ButtomBlue";
import CustomInputText from "../../components/CustomInputText/CustomInputText";
import "./SignIn.css";
import { defaultSignIn, SignInType } from "../../types/SignInType";
import { Link, useNavigate } from "react-router-dom";
import { signInService } from "../../services/signInService";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';

export default function SignInPage() {
  const [signIn, setSignIn] = useState<SignInType>(defaultSignIn);
  const handlerChange = (field: keyof SignInType, value: string) => {
    setSignIn((prev) => ({ ...prev, [field]: value }));
    console.log(signIn);
  };
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleSignIn = async () => {
    try {
      const res = await signInService(signIn);
      login(res.token);
      toast.success('Login realizado com sucesso!');
      navigate("/overview");
    } catch (error) {
      toast.error('Usuário ou senha inválidos');
      console.error("Erro no login:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/overview");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div id="body-signin">
      <section id="section-signin">
        <div id="info-signin">
          <h1>Entrar</h1>
          <p>
            Ainda não possui uma conta? <Link to={"../"}>Cadastre-se</Link>
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
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
                value={signIn.email}
                onChange={(e) => handlerChange("email", e.target.value)}
              ></CustomInputText>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <CustomInputText
                type_input={"password"}
                label={"Senha"}
                placeholder={"Insira sua senha"}
                value={signIn.senha}
                onChange={(e) => handlerChange("senha", e.target.value)}
              ></CustomInputText>
            </div>
            <a href="#">Esqueceu a senha?</a>
            <ButtomBlue
              text_button="Entrar"
              onClick={handleSignIn}
            ></ButtomBlue>
          </form>
        </div>
      </section>
    </div>
  );
}
