import { z } from "zod";

export type ProfilePayloadType = {
  idUsuario: string;
  userPessoal: {
    nome: string;
    email: string;
    telefone: string | null;
    dataNascimento: Date | null;
  };
  perfilPessoal: {
    classificacaoAfirmativa: boolean | null;
    corRaca: number;
    pronome: number;
    identidadeGenero: number;
    orientacaoSexual: number;
    sobreMim: string;
    enderecoBairro: string | null;
    enderecoCEP: string;
    enderecoCidade: string | null;
    enderecoEstado: string | null;
    enderecoNumero: string | null;
    enderecoRua: string | null;
  };
};

export const defaultProfilePayload: ProfilePayloadType = {
  idUsuario: "",
  userPessoal: {
    nome: "",
    email: "",
    telefone: null,
    dataNascimento: null,
  },
  perfilPessoal: {
    classificacaoAfirmativa: null,
    corRaca: 0,
    pronome: 0,
    identidadeGenero: 0,
    orientacaoSexual: 0,
    sobreMim: "",
    enderecoBairro: null,
    enderecoCEP: "",
    enderecoCidade: null,
    enderecoEstado: null,
    enderecoNumero: null,
    enderecoRua: null,
  },
};

export const validationProfilePayload = z.object({
  idUsuario: z.string().uuid("ID inválido"),
  userPessoal: z.object({
    nome: z.string().nonempty("O nome completo é obrigatório."),
    email: z.string().nonempty("O email é obrigatório.").email("O email é inválido."),
    telefone: z.string().min(8, "O telefone é obrigatório."),
    dataNascimento: z.date({
      required_error: "A data de nascimento é obrigatória.",
      invalid_type_error: "Data de nascimento inválida.",
    }),
  }),
  perfilPessoal: z.object({
    classificacaoAfirmativa: z.boolean(),
    corRaca: z.number(),
    pronome: z.number(),
    identidadeGenero: z.number(),
    orientacaoSexual: z.number(),
    sobreMim: z.string().nonempty("O campo 'Sobre mim' é obrigatório."),
    enderecoBairro: z.string().nonempty("O bairro é obrigatório."),
    enderecoCEP: z.string().min(8, "O CEP é obrigatório."),
    enderecoCidade: z.string().nonempty("A cidade é obrigatória."),
    enderecoEstado: z.string().nonempty("O estado é obrigatório."),
    enderecoNumero: z.string().nonempty("O número é obrigatório."),
    enderecoRua: z.string().nonempty("A rua é obrigatória."),
  }),
});

export type ProfilePayloadZod = z.infer<typeof validationProfilePayload>;
