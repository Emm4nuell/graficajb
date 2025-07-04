export type CustomFilter = {
  cargo: string;
  titulo: string;
  regimeTrabalho: string;
  tipoContratacao: string;
  localidade: string;
  uf: string;
  status: number;
  page: number;
  size: number;
};

export const defaultCustomerFilter: CustomFilter = {
  cargo: "",
  titulo: "",
  regimeTrabalho: "",
  tipoContratacao: "",
  localidade: "",
  uf: "",
  status: 1,
  page: 0,
  size: 6,
};
