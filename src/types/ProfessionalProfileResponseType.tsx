export type ProfessionalProfileResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
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
    competenciaId1: string;
  }[];
};
