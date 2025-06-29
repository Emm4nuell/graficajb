import { z } from "zod";

export const validationProfile = z.object({
  idUsuario: z.string().uuid("ID do usuário inválido"),
  dataNascimento: z
    .string()
    .nonempty("A data de nascimento é obrigatória.")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Data de nascimento inválida.",
    }),
  perfilPessoal: z.object({
    classificacaoAfirmativa: z.boolean(),
    corRaca: z.number(),
    pronome: z.number(),
    identidadeGenero: z.number(),
    orientacaoSexual: z.number(),
    sobreMim: z.string().nullable(),
    enderecoBairro: z.string().nullable(),
    enderecoCEP: z.string().nullable(),
    enderecoCidade: z.string().nullable(),
    enderecoEstado: z.string().nullable(),
    enderecoNumero: z.string().nullable(),
    enderecoRua: z.string().nullable(),
  }),
  profissional: z.object({
    curriculo: z.string().nullable(),
    experienciasProfissional: z.array(
      z.object({
        empresa: z.string(),
        posicao: z.string(),
        dataInicio: z
          .string()
          .refine((date) => !isNaN(Date.parse(date)), {
            message: "Data início inválida.",
          }),
        dataFim: z
          .string()
          .nullable()
          .optional()
          .refine(
            (date) => date === null || !isNaN(Date.parse(date as string)),
            {
              message: "Data fim inválida.",
            }
          ),
        empregoAtual: z.boolean(),
      })
    ),
    areasInteresse: z.array(z.string().uuid()),
    formacaoAcademicas: z.array(
      z.object({
        grau: z.string(),
        areaAtuacao: z.string(),
        dataConclusao: z
          .string()
          .refine((date) => !isNaN(Date.parse(date)), {
            message: "Data conclusão inválida.",
          }),
        concluido: z.boolean(),
        certificado: z.string(),
      })
    ),
    cursos: z.array(
      z.object({
        nomeCurso: z.string(),
        dataConclusao: z
          .string()
          .refine((date) => !isNaN(Date.parse(date)), {
            message: "Data conclusão inválida.",
          }),
        concluido: z.boolean(),
        certificado: z.string(),
        vagaId: z.string().uuid(),
      })
    ),
    competenciasCandidato: z.array(
      z.object({
        competenciaId: z.string().uuid(),
        nivel: z.number().min(0).max(5),
        competenciaId1: z.string().nullable(),
      })
    ),
  }),
});

export type ProfilePayload = z.infer<typeof validationProfile>;
