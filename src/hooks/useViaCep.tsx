import { useState } from "react";
import { toast } from 'react-toastify';

export function useViaCep() {
  const [endereco, setEndereco] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const fetchAddress = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, "");
    if (cleanedCep.length == 0) {
      return;
    }

    else if (cleanedCep.length !== 8) {
      toast.error("CEP inválido.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();

      if ("erro" in data) {
        toast.error("CEP não encontrado.");
        return;
      }
      return {
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
        cep: cleanedCep || "",
      };
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return { endereco, fetchAddress, setEndereco };
}
