import { z } from "zod";

export type RegisterType = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  perfil: string;
};

export const defaultRegister: RegisterType = {
  nome: "",
  sobrenome: "",
  email: "",
  senha: "",
  perfil: ""
};

export const validationRegister = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("O email é inválido"),
  senha: z
    .string()
    .nonempty("A senha é obrigatória.")
    .min(6, "A senha deve conter mais de 6 caracteres"),
});

export type RegisterZod = z.infer<typeof validationRegister>;
