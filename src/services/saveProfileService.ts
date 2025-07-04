import { API_URL } from "./api";
import { ProfilePayloadType } from "../types/ProfileType";

export const savePerfilService = async (data: ProfilePayloadType, token) => {
  const response = await fetch(`${API_URL}/candidates/personal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = "Erro desconhecido";

    // Verifica se tem body e se é JSON
    const text = await response.text();
    if (text) {
      try {
        const errorJson = JSON.parse(text);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // Se não for JSON, usa o texto mesmo
        errorMessage = text;
      }
    }

    throw new Error(errorMessage);
  }
  
  // Retorna o JSON só se existir
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};
