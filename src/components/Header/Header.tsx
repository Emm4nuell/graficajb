import { useState } from 'react';
import './Header.css';

export default function Header() {

    const [isOpen, setIsOpen] = useState(false); 
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <header>
                <div className="header-container">
                    <img className="header-logo" src="/logo.png" alt=""/>
                    <nav className="header-nav">
                        <a href="#" className="active">Visão Geral</a>
                        <a href="#">Oportunidades</a>
                        <a href="#">Teste Exemplo</a>
                        <a href="#">Teste Exemplo</a>
                        <img className="header-profile" src="/perfil-icon.svg" alt="" onClick={toggleMenu}/>
                    </nav>
                </div>

                {isOpen &&
                <div className="sidebar">
                    <span className="sidebar-name">João Pessoa da Silva</span>
                    <span className="sidebar-email">joaopessoadasilva@gmail.com</span>
                    <div className='sidebar-options'>
                        <a href="#"><img src="/src/assets/icons/perfil.svg" alt=""/>Perfil</a>
                        <a href="#"><img src="/src/assets/icons/curriculo.svg" alt=""/>Meu Currículo</a>
                        <a href="#"><img src="/src/assets/icons/bag.svg" alt=""/>Minhas Candidaturas</a>
                        <a href="#"><img src="/src/assets/icons/rec.svg" alt="" style={{width: "1.55rem", height: "1.3rem"}}/>Minhas Vagas</a>
                        <a href="#"><img src="/src/assets/icons/setting.svg" alt=""/>Configurações</a>
                        <a href="#"><img src="/src/assets/icons/exit.svg" alt=""/>Sair</a>
                    </div>
                </div>
                }
            </header>
        </>
    )
}