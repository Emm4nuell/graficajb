import { API_URL } from "./api";
import { ProfessionalProfileResponse } from "../types/ProfessionalProfileResponseType";

export const getProfessionalProfile = async (
  token: string,
  id: string
): Promise<ProfessionalProfileResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/candidates/professional/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data: ProfessionalProfileResponse = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }
};
