import { useState } from "react";
import "./Header.css";
import { Link, NavLink, useNavigate  } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ButtomCard from "../ButtomCard/ButtomCard";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsOpen(false)
    logout()
  }

  return (
    <>

        <header>
            <div className="header-container">
            <img className="header-logo" src="/logo.png" alt="" />
            {isAuthenticated ? (
                <nav className="header-nav">
                    <NavLink to="/overview" className={({ isActive }) => (isActive ? "active" : "")}>Visão Geral</NavLink>
                    <NavLink to="/opportunity" className={({ isActive }) => (isActive ? "active" : "")}>Oportunidades</NavLink>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Inserir Algo</NavLink>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Inserir Algo</NavLink>
                    <img
                    className="header-profile"
                    src="/perfil-icon.svg"
                    alt=""
                    onClick={toggleMenu}
                    style={{cursor: 'pointer'}}
                    />
                </nav>
            ) :
                <nav className="header-nav">
                    <NavLink to="/overview" className={({ isActive }) => (isActive ? "active" : "")}>Visão Geral</NavLink>
                    <NavLink to="/opportunity" className={({ isActive }) => (isActive ? "active" : "")}>Oportunidades</NavLink>
                    <Link to={"/signin"}><ButtomCard text_button={"Entrar"}/></Link>
                    <Link to={"/register"}><ButtomCard text_button={"Cadastrar-se"} secondary_button={true}/></Link>
                </nav>            
            }
            </div>


        {isOpen && (
          <div className="sidebar">
            <span className="sidebar-name">João Pessoa da Silva</span>
            <span className="sidebar-email">joaopessoadasilva@gmail.com</span>
            <div className="sidebar-options">
              <Link to={"/perfil"}>
                <img src="/src/assets/icons/perfil.svg" alt="" />
                Perfil
              </Link>
              <Link to={"/myresume"}>
                <img src="/src/assets/icons/curriculo.svg" alt="" />
                Meu Currículo
              </Link>
              <Link to={"/perfil"}>
                <img src="/src/assets/icons/bag.svg" alt="" />
                Minhas Candidaturas
              </Link>
              <Link to={"/perfil"}>
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
              </Link>
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
