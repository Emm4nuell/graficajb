import './Header.css';

export default function Header() {
    return (
        <>
            <header className="header-container">
                <img className="header-logo" src="/logo.png" alt=""/>
                <nav className="header-nav">
                    <a href="#" className="active">Visão Geral</a>
                    <a href="#">Oportunidades</a>
                    <a href="#">Teste Exemplo</a>
                    <a href="#">Teste Exemplo</a>
                    <img className="header-profile" src="/perfil-icon.svg" alt=""/>
                </nav>
            </header>

            <div className="sidebar">
                <span className="sidebar-name">João Pessoa da Silva</span>
                <span className="sidebar-email">joaopessoadasilva@gmail.com</span>
                <a href="#"><img src="./vite.svg" alt=""/> Visão Geral</a>
                <a href="#"><img src="./vite.svg" alt=""/> Oportunidades</a>
                <a href="#"><img src="./vite.svg" alt=""/> Teste Exemplo</a>
                <a href="#"><img src="./vite.svg" alt=""/> Teste Exemplo</a>
            </div>
        </>
    )
}