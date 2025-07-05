import { CustomerApplication } from "../types/ApplicationType";
import { API_URL } from "./api";

export const applicationsservice = async (
  token: string,
  user: CustomerApplication
) => {
  const response = await fetch(`${API_URL}/applications/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
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
