import { API_URL } from "./api";

export const detailsVacanciesServices = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/vacancies/${id}/find`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw Error("ERROR", error);
  }
};
