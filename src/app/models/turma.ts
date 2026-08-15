export interface Turma {
  id: number;
  modalidade: string;
  instrutorId: number;
  diaSemana: string;
  horario: string;
  capacidadeMaxima: number;
  alunosMatriculadosIds: number[];
}
