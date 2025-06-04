export default function Header(){
    return (
        <>
            <header className="bg-[#2C2C2C] w-[100%] h-[5rem] flex flex-row justify-around items-center">
                <img className="w-[12rem]" src="/logo.png" alt=""/>
                <nav className="flex flex-row justify-center items-center gap-[2.3rem] text-[#E8E8E8] text-base font-semibold">
                    <a href="#" className="text-[#00A8EA] border-b-4 border-b-solid border-b-[#00A8EA]">Visão Geral</a>
                    <a href="#">Oportunidades</a>
                    <a href="#">Teste Exemplo</a>
                    <a href="#">Teste Exemplo</a>
                    <img className="w-[3.875rem]" src="/perfil-icon.svg" alt=""/>
                </nav>
            </header>

            <div className="bg-[#2C2C2C] text-[#E8E8E8] w-[15rem] h-[21rem] flex flex-col">
                <span className="text-base font-semibold">João Pessoa da Silva</span>
                <span className="text-xs font-light mb-5" style={{marginBottom: "1.5rem"}}>joaopessoadasilva@gmail.com</span>
                <a href="#" className="flex flex-row items-center text-xs font-medium" style={{marginRight:"5rem"}}><img src="./vite.svg" alt=""></img> Visão Geral</a>
                <a href="#" className="flex flex-row items-center text-xs font-medium" style={{marginRight:"0.5rem"}}><img src="./vite.svg" alt=""></img> Oportunidades</a>
                <a href="#" className="flex flex-row items-center text-xs font-medium" style={{marginRight:"0.5rem"}}><img src="./vite.svg" alt=""></img> Teste Exemplo</a>
                <a href="#" className="flex flex-row items-center text-xs font-medium" style={{marginRight:"0.5rem"}}><img src="./vite.svg" alt=""></img> Teste Exemplo</a>
            </div>
        </>
    )
}