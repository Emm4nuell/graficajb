import { CustomFilter } from "../types/FilterType";
import { API_URL } from "./api";

const buildQueryString = (filter: CustomFilter) => {
  const params = new URLSearchParams();
  params.append("cargo", filter.cargo);
  params.append("titulo", filter.titulo);
  params.append("regimeTrabalho", filter.regimeTrabalho);
  params.append("tipoContratacao", filter.tipoContratacao);
  params.append("localidade", filter.localidade);
  params.append("uf", filter.uf);
  params.append("status", String(filter.status));
  params.append("page", String(filter.page));
  params.append("size", String(filter.size));

  return params.toString();
};

export const myApplicationsService = async (token: any, idUser: string) => {
  try {
    const response = await fetch(
      `${API_URL}/applications/my-vacancies/${idUser}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
