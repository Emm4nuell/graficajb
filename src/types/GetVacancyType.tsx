export type GetVacancyType = {
  id: string;
  titulo: string;
  descricao: string;
  cargo: string;
  atividades: string;
  beneficios: string;
  salario: number;
  regimeTrabalho: string;
  horarioTrabalho: string;
  tipoContratacao: string;
  diferenciais: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  empresaId: string;
  status: number;
};

export const defaultGetVacancy: GetVacancyType = {
  id: "",
  titulo: "",
  descricao: "",
  cargo: "",
  atividades: "",
  beneficios: "",
  salario: 0,
  regimeTrabalho: "",
  horarioTrabalho: "",
  tipoContratacao: "",
  diferenciais: "",
  endereco: {
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  },
  empresaId: "",
  status: 1,
};

