import { z } from "zod";

export type RegisterType = {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  repitaSenha: string
  perfil: string;
};

export const defaultRegister: RegisterType = {
  nome: "",
  telefone: "",
  email: "",
  senha: "",
  repitaSenha: "",
  perfil: ""
};

export const validationRegister = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  telefone: z.string().nonempty("O campo telefone é obrigatório"),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("O email é inválido"),
  senha: z
    .string()
    .nonempty("A senha é obrigatória.")
    .min(6, "A senha deve conter mais de 6 caracteres"),
  repitaSenha: z
    .string()
    .nonempty("Campo repita senha é obrigatório.")
    .min(6, "A senha deve conter mais de 6 caracteres")
});

export type RegisterZod = z.infer<typeof validationRegister>;
