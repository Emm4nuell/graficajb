import { useState } from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ButtomCard from "../ButtomCard/ButtomCard";
import { toCapitalize } from "../../utils/toCapitalize";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, logout, isAuthenticated, perfilCandidato } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <>
      <header>
        <div className="header-container">
          <img className="header-logo" src="/logo.png" alt="" />
          {isAuthenticated ? (
            <nav className="header-nav">
              <NavLink
                to="/overview"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Visão Geral
              </NavLink>
              <NavLink
                to="/opportunity"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {perfilCandidato ? "Oportunidades" : "Vagas"}
              </NavLink>
              {!perfilCandidato && (
                <NavLink
                  to="/createvacancy"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Criar Vaga
                </NavLink>
              )}

              <img
                className="header-profile"
                src="/perfil-icon.svg"
                alt=""
                onClick={toggleMenu}
                style={{ cursor: "pointer" }}
              />
            </nav>
          ) : (
            <nav className="header-nav">
              <NavLink
                to="/opportunity"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Oportunidades
              </NavLink>

              <Link to={"/signin"}>
                <ButtomCard text_button={"Entrar"} />
              </Link>
              <Link to={"/register"}>
                <ButtomCard
                  text_button={"Cadastrar-se"}
                  secondary_button={true}
                />
              </Link>
            </nav>
          )}
        </div>

        {isOpen && (
          <div className="sidebar">
            <span className="sidebar-name">{toCapitalize(user?.nome)}</span>
            <span className="sidebar-email">{user?.email}</span>

            <div className="sidebar-options">
              {perfilCandidato && (
                <>
                  <Link to={"/profile"}>
                    <img src="/src/assets/icons/perfil.svg" alt="" />
                    Perfil
                  </Link>
                  <Link to={"/myresume"}>
                    <img src="/src/assets/icons/curriculo.svg" alt="" />
                    Meu Currículo
                  </Link>
                  <Link to={"/myapplications"}>
                    <img src="/src/assets/icons/bag.svg" alt="" />
                    Minhas Candidaturas
                  </Link>
                </>
              )}

              {/* <Link to={"/myvacancies"}>
                <img
                  src="/src/assets/icons/rec.svg"
                  alt=""
                  style={{ width: "1.55rem", height: "1.3rem" }}
                />
                Minhas Vagas
              </Link>
              <Link to={"/perfil"}>
                <img src="/src/assets/icons/setting.svg" alt="" />
                Configurações
              </Link> */}
              <Link to={"/overview"} onClick={handleLogout}>
                <img src="/src/assets/icons/exit.svg" alt="" />
                Sair
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
