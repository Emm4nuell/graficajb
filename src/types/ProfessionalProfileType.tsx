import { z } from "zod";

export type ProfessionalProfilePayloadType = {
  idUsuario: string;
  perfilProfissional: {
    id: string;
    curriculo: string;
    experienciasProfissional: {
      id: string;
      empresa: string;
      posicao: string;
      dataInicio: string;
      dataFim: string;
      empregoAtual: boolean;
    }[];
    areasInteresse: string[];
    formacaoAcademicas: {
      id: string;
      grau: string;
      areaAtuacao: string;
      dataInicio: string;
      dataConclusao: string;
      concluido: boolean;
      certificado: string;
    }[];
    cursos: {
      id: string;
      nomeCurso: string;
      dataInicio: string;
      dataConclusao: string;
      concluido: boolean;
      certificado: string;
      vagaId: string;
    }[];
    competenciasCandidato: {
      id: string;
      competenciaId: string;
      nivel: number;
      competenciaId1: null;
    }[];
  };
};

export const defaultProfessionalProfilePayload: ProfessionalProfilePayloadType =
  {
    idUsuario: "",
    perfilProfissional: {
      id: "",
      curriculo: "",
      experienciasProfissional: [],
      areasInteresse: [],
      formacaoAcademicas: [],
      cursos: [],
      competenciasCandidato: [],
    },
  };

export const validationProfessionalProfile = z.object({
  idUsuario: z.string().uuid("ID inválido"),
  perfilProfissional: z.object({
    id: z.string().uuid("ID do perfil inválido."),
    curriculo: z.string().nonempty("O campo Currículo é obrigatório."),
    experienciasProfissional: z.array(
      z.object({
        id: z
          .union([
            z.string().uuid("ID da experiência inválido."),
            z.literal(""),
          ])
          .optional(),
        empresa: z.string().nonempty("Empresa é obrigatória."),
        posicao: z.string().nonempty("Posição é obrigatória."),
        dataInicio: z.string().nonempty("Data de início é obrigatória."),
        dataFim: z.string().optional(),
        empregoAtual: z.boolean(),
      })
    ),
    areasInteresse: z.array(
      z.string().uuid("ID da área de interesse inválido.")
    ),
    formacaoAcademicas: z.array(
      z.object({
        id: z.string().uuid("ID da formação inválido."),
        grau: z.string().nonempty("Grau é obrigatório."),
        areaAtuacao: z.string().nonempty("Área de atuação é obrigatória."),
        dataInicio: z.string().nonempty("Data de início é obrigatória."),
        dataConclusao: z.string().optional(),
        concluido: z.boolean(),
        certificado: z.string().optional(),
      })
    ),
    cursos: z.array(
      z.object({
        id: z
          .union([
            z.string().uuid("ID do curso inválido."),
            z.literal(""),
          ])
          .optional(),
        nomeCurso: z.string().nonempty("Nome do curso é obrigatório."),
        dataInicio: z.string().nonempty("Data de início é obrigatória."),
        dataConclusao: z.string().optional(),
        concluido: z.boolean(),
        certificado: z.string().optional(),
        vagaId: z.string().optional(),
      })
    ),
    competenciasCandidato: z.array(
      z.object({
        id: z
          .union([
            z.string().uuid("ID da competência inválido."),
            z.literal(""),
          ])
          .optional(),
        competenciaId: z.string().uuid("ID da competência inválido."),
        nivel: z.number().int(),
        competenciaId1: z.null(),
      })
    ),
  }),
});
