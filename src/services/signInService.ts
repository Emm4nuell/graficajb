import { SignInType } from "../types/SignInType";
import { API_URL } from "./api";

export const signInService = async (data: SignInType) => {
  const response = await fetch(`${API_URL}/authentication`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Erro na API");
  }

  console.log("Resposta da API:", result);
  return result;
};
