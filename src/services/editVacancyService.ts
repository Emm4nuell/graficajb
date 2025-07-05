import { API_URL } from "./api";
import { EditVacancyType } from "../types/EditVacancyType";

export const editVacancyService = async (data: EditVacancyType, token: string, id: string) => {
  const response = await fetch(`${API_URL}/vacancies/${id}/edit`, {
    method: "PUT",
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
