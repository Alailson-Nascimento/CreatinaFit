import { Injectable, signal, effect } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Aluno } from '../models/aluno';

@Injectable({ providedIn: 'root' })
export class AlunoService {
  private chaveStorage = 'academia-alunos';

  private alunos = signal<Aluno[]>(this.carregarAlunos());

  constructor() {
    effect(() => {
      localStorage.setItem(this.chaveStorage, JSON.stringify(this.alunos()));
    });
  }

  private carregarAlunos(): Aluno[] {
    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if (dadosSalvos) {
      const alunos: Aluno[] = JSON.parse(dadosSalvos);
      return alunos.map((aluno) => ({
        ...aluno,
        dataMatricula: new Date(aluno.dataMatricula),
        dataVencimentoPlano: new Date(aluno.dataVencimentoPlano),
      }));
    }

    return this.gerarAlunosFake();
  }

  private gerarAlunosFake(): Aluno[] {
    const lista: Aluno[] = [];

    for (let i = 1; i <= 15; i++) {
      const dataMatricula = faker.date.past({ years: 1 });
      const dataVencimento = faker.date.soon({ days: 60 });

      lista.push({
        id: i,
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        planoId: faker.number.int({ min: 1, max: 3 }),
        dataMatricula,
        dataVencimentoPlano: dataVencimento,
        ativo: faker.datatype.boolean(),
      });
    }

    return lista;
  }

  listarAlunos(): Aluno[] {
    return this.alunos();
  }

  adicionarAluno(aluno: Omit<Aluno, 'id'>): void {
    const novoAluno: Aluno = {
      ...aluno,
      id: this.alunos().length + 1,
    };

    this.alunos.update((lista) => [...lista, novoAluno]);
  }
}
