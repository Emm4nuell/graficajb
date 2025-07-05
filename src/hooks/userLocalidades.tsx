import { useState } from "react";

export function useLocalidade() {
  const [estados, setEstado] = useState([]);
  const [cidades, setCidade] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const buscarEstados = async (value?: string) => {
    setCarregando(true);
    try {
      if (value) {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`
        );
        const data = await response.json();
        setCidade(data);
      } else {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        const data = await response.json();
        setEstado(data);
      }
    } catch (error) {
      console.error("Erro ao buscar estados", error);
      setErro(error);
    } finally {
      setCarregando(false);
    }
  };

  return { estados, cidades, buscarEstados, erro, carregando };
}
