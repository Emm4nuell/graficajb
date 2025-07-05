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
    console.warn(result)
    throw result || "Erro na API";
  }
  return result;
};
