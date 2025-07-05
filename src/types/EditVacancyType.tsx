import { z } from "zod";

export type EditVacancyType  = {
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
  },
  status: number
};

export const defaultEditVacancy: EditVacancyType = {
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
  status: 1
};


export const validationEditVacancyPayload = z.object({
  titulo: z
    .string()
    .nonempty("O título é obrigatório."),
  descricao: z
    .string()
    .nonempty("A descrição é obrigatória."),
  cargo: z
    .string()
    .nonempty("O cargo é obrigatório."),
  atividades: z
    .string()
    .nonempty("As responsabilidades e atribuições são obrigatórias."),
  beneficios: z.string().optional(),
  salario: z.number().optional(),
  regimeTrabalho: z
    .string()
    .nonempty("O regime de trabalho é obrigatório."),
  horarioTrabalho: z.string().optional(),
  tipoContratacao: z
    .string()
    .nonempty("O tipo de contratação é obrigatório."),
  diferenciais: z.string().optional(),
  endereco: z.object({
    cep: z
      .string()
      .nonempty("O CEP é obrigatório."),
    rua: z
      .string()
      .nonempty("A rua é obrigatória."),
    numero: z.string().optional(),
    bairro: z
      .string()
      .nonempty("O bairro é obrigatório."),
    cidade: z
      .string()
      .nonempty("A cidade é obrigatória."),
    uf: z
      .string()
      .nonempty("O estado é obrigatório."),
  }),
  status: z.number().optional()
});

export type ValidationEditVacancy = z.infer<typeof validationEditVacancyPayload>;
