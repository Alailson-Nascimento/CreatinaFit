import { Component, computed } from '@angular/core';
import { Instrutor } from '../../models/instrutor';
import { TurmaService } from '../../services/turma';
import { InstrutorService } from '../../services/instrutor';

@Component({
  selector: 'app-turmas',
  standalone: true,
  imports: [],
  templateUrl: './turmas.html',
  styleUrl: './turmas.scss',
})
export class Turmas {
  instrutores: Instrutor[];

  turmas = computed(() =>
    this.servicoTurma.listarTurmas().map((turma) => ({
      ...turma,
      nomeInstrutor:
        this.instrutores.find((i) => i.id === turma.instrutorId)?.nome ?? 'Sem instrutor',
      vagasDisponiveis: turma.capacidadeMaxima - turma.alunosMatriculadosIds.length,
    })),
  );

  constructor(
    private servicoTurma: TurmaService,
    private servicoInstrutor: InstrutorService,
  ) {
    this.instrutores = this.servicoInstrutor.listarInstrutores();
  }
}
