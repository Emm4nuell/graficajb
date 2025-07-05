import { API_URL } from "./api";

export const getCandidaciesByVacancy = async (
  token: string,
  idVacancy: string
): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/applications/${idVacancy}/candidates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return [];
  }
};
