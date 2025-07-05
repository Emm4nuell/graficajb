import { API_URL } from "./api";
import { GetVacancyType } from "../types/GetVacancyType";

export const getVacancyById = async (
  id: string
): Promise<GetVacancyType | null> => {
  try {
    const response = await fetch(`${API_URL}/vacancies/${id}/find`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data: GetVacancyType = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }
};
