type Endereco = {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type OpportunitieType = {
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
  endereco: Endereco;
  empresaId: string;
  status: number;
};

export const defaultEndereco: Endereco = {
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
};

export const defaultOpportunitie: OpportunitieType = {
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
  endereco: defaultEndereco,
  empresaId: "",
  status: 0,
};
