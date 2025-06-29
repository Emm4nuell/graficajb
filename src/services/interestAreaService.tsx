import { API_URL } from "./api";

export const getInterestAreasOptions = async (token) => {

  try {
    const response = await fetch(`${API_URL}/interest-areas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();

    const options = data.map((item: any) => ({
      label: item.nome,
      value: item.id,
    }));

    return options;
  } catch (error) {
    console.error("Erro ao buscar competências:", error);
    return []; 
  }
};
