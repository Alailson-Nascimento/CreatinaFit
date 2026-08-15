import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoService } from '../../services/aluno';
import { PlanoService } from '../../services/plano';
import { RegrasNegocioService } from '../../services/regras-negocio';
import { Plano } from '../../models/plano';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alunos.html',
  styleUrl: './alunos.scss',
})
export class Alunos {
  mostrarFormulario = signal(false);
  formulario: FormGroup;
  planos: Plano[];

  alunos = computed(() =>
    this.servicoAluno.listarAlunos().map((aluno) => ({
      ...aluno,
      nomePlano: this.planos.find((p) => p.id === aluno.planoId)?.nome ?? 'Sem plano',
      vencido: this.servicoRegras.planoEstaVencido(aluno),
    })),
  );

  constructor(
    private construtorFormulario: FormBuilder,
    private servicoAluno: AlunoService,
    private servicoPlano: PlanoService,
    private servicoRegras: RegrasNegocioService,
  ) {
    this.planos = this.servicoPlano.listarPlanos();

    this.formulario = this.construtorFormulario.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      planoId: [1, Validators.required],
    });
  }

  alternarFormulario(): void {
    this.mostrarFormulario.update((valor) => !valor);
  }

  cadastrarAluno(): void {
    if (this.formulario.invalid) {
      return;
    }

    const { nome, email, planoId } = this.formulario.value;
    const hoje = new Date();
    const vencimento = new Date(hoje);
    vencimento.setDate(hoje.getDate() + 30);

    this.servicoAluno.adicionarAluno({
      nome: nome!,
      email: email!,
      planoId: planoId!,
      dataMatricula: hoje,
      dataVencimentoPlano: vencimento,
      ativo: true,
    });

    this.formulario.reset({ planoId: 1 });
    this.mostrarFormulario.set(false);
  }
}
