import { Component, signal } from '@angular/core';
import { AlunoService } from '../../services/aluno';
import { TurmaService } from '../../services/turma';
import { CheckInService } from '../../services/checkin';
import { RegrasNegocioService } from '../../services/regras-negocio';
import { Aluno } from '../../models/aluno';
import { Turma } from '../../models/turma';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [],
  templateUrl: './checkin.html',
  styleUrl: './checkin.scss',
})
export class Checkin {
  alunos: Aluno[];
  turmas: Turma[];
  mensagem = signal('');
  mensagemTipo = signal<'sucesso' | 'erro'>('sucesso');

  constructor(
    private servicoAluno: AlunoService,
    private servicoTurma: TurmaService,
    private servicoCheckin: CheckInService,
    private servicoRegras: RegrasNegocioService,
  ) {
    this.alunos = this.servicoAluno.listarAlunos();
    this.turmas = this.servicoTurma.listarTurmas();
  }

  fazerCheckin(alunoId: number, turmaId: number): void {
    const aluno = this.alunos.find((a) => a.id === alunoId);

    if (!aluno) {
      return;
    }

    if (this.servicoRegras.planoEstaVencido(aluno)) {
      this.mensagem.set(`${aluno.nome} não pode fazer check-in: plano vencido.`);
      this.mensagemTipo.set('erro');
      return;
    }

    const checkins = this.servicoCheckin.listarCheckins();
    if (this.servicoRegras.alunoJaFezCheckinHoje(alunoId, turmaId, checkins)) {
      this.mensagem.set(`${aluno.nome} já fez check-in nessa turma hoje.`);
      this.mensagemTipo.set('erro');
      return;
    }

    this.servicoCheckin.registrarCheckin(alunoId, turmaId);
    this.mensagem.set(`Check-in de ${aluno.nome} realizado com sucesso!`);
    this.mensagemTipo.set('sucesso');
  }
}
