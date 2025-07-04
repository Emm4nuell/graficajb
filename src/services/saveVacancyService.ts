import { API_URL } from "./api";
import { CreateVacancyType } from "../types/CreateVacancyType";

export const saveVacancyService = async (data: CreateVacancyType, token) => {
  const response = await fetch(`${API_URL}/vacancies/publish`, {
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
        errorMessage = text;
      }
    }

    throw new Error(errorMessage);
  }
  
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};
