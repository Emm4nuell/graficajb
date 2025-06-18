import { RegisterType } from "../types/RegisterType";
import { API_URL } from "./api";

export const createUser = async (data: RegisterType) => {
  const response = await fetch(`${API_URL}/users`, {
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
