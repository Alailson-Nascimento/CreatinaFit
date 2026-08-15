import { Injectable } from '@angular/core';
import { Aluno } from '../models/aluno';
import { Turma } from '../models/turma';
import { CheckIn } from '../models/checkin';

@Injectable({ providedIn: 'root' })
export class RegrasNegocioService {
  // Regra 1: aluno com plano vencido não pode fazer check-in
  planoEstaVencido(aluno: Aluno): boolean {
    const hoje = new Date();
    return aluno.dataVencimentoPlano < hoje;
  }

  // Regra 2: turma não pode passar da capacidade máxima
  turmaEstaLotada(turma: Turma): boolean {
    return turma.alunosMatriculadosIds.length >= turma.capacidadeMaxima;
  }

  // Regra 3: aluno não pode fazer check-in duas vezes na mesma aula (no mesmo dia)
  alunoJaFezCheckinHoje(alunoId: number, turmaId: number, checkins: CheckIn[]): boolean {
    const hoje = new Date().toDateString();

    return checkins.some(
      (checkin) =>
        checkin.alunoId === alunoId &&
        checkin.turmaId === turmaId &&
        checkin.data.toDateString() === hoje,
    );
  }

  // Regra 4: instrutor não pode ter duas turmas no mesmo horário
  instrutorTemConflitoHorario(novaTurma: Turma, turmasExistentes: Turma[]): boolean {
    return turmasExistentes.some(
      (turma) =>
        turma.instrutorId === novaTurma.instrutorId &&
        turma.diaSemana === novaTurma.diaSemana &&
        turma.horario === novaTurma.horario &&
        turma.id !== novaTurma.id,
    );
  }

  // Regra 5: aluno não pode se matricular em duas turmas com o mesmo horário
  alunoTemConflitoHorario(alunoId: number, novaTurma: Turma, todasTurmas: Turma[]): boolean {
    const turmasDoAluno = todasTurmas.filter((turma) =>
      turma.alunosMatriculadosIds.includes(alunoId),
    );

    return turmasDoAluno.some(
      (turma) => turma.diaSemana === novaTurma.diaSemana && turma.horario === novaTurma.horario,
    );
  }

  // Regra 6: ao renovar o plano, a nova data de vencimento conta a partir de hoje
  calcularNovaDataVencimento(duracaoEmDias: number): Date {
    const hoje = new Date();
    const novaData = new Date(hoje);
    novaData.setDate(hoje.getDate() + duracaoEmDias);
    return novaData;
  }

  // Regra 7: cadastro de plano/turma não aceita valores inválidos
  valorEhValido(valor: number): boolean {
    return valor > 0;
  }

  capacidadeEhValida(capacidade: number): boolean {
    return capacidade > 0;
  }
}
