import { API_URL } from "./api";
import { ProfileResponseType } from "../types/ProfileResponseType ";

export const getProfile = async (
  token: string,
  id: string
): Promise<ProfileResponseType | null> => {
  try {
    const response = await fetch(`${API_URL}/candidates/personal/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data: ProfileResponseType = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }
};
