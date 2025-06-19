import { SignInType } from "../types/SignInType";
import { API_URL } from "./api";

export const signInService = async (data: SignInType) => {
  const response = await fetch(`${API_URL}/authentication`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro na API");
  }
  return response.json();
};
