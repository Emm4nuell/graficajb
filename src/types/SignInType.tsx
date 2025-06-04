import { z } from "zod";

export type SignInType = {
  email: string;
  senha: string;
};

export const defaultSignIn: SignInType = {
  email: "",
  senha: "",
};

export const validationSignIn = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("O email é inválido"),
  senha: z
    .string()
    .nonempty("A senha é obrigatória.")
    .min(6, "A senha deve conter mais de 6 caracteres"),
});

export type SignInZod = z.infer<typeof validationSignIn>;
