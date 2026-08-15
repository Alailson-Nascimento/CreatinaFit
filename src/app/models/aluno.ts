export interface Aluno {
  id: number;
  nome: string;
  email: string;
  planoId: number;
  dataMatricula: Date;
  dataVencimentoPlano: Date;
  ativo: boolean;
}
