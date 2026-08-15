import { Injectable, signal, effect } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Turma } from '../models/turma';

@Injectable({ providedIn: 'root' })
export class TurmaService {
  private chaveStorage = 'academia-turmas';

  private turmas = signal<Turma[]>(this.carregarTurmas());

  constructor() {
    effect(() => {
      localStorage.setItem(this.chaveStorage, JSON.stringify(this.turmas()));
    });
  }

  private carregarTurmas(): Turma[] {
    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }

    return this.gerarTurmasFake();
  }

  private gerarTurmasFake(): Turma[] {
    const modalidades = ['Musculação', 'Crossfit', 'Yoga', 'Pilates', 'Natação'];
    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const horarios = ['07:00', '09:00', '18:00', '19:30'];
    const lista: Turma[] = [];

    for (let i = 1; i <= 8; i++) {
      lista.push({
        id: i,
        modalidade: faker.helpers.arrayElement(modalidades),
        instrutorId: faker.number.int({ min: 1, max: 5 }),
        diaSemana: faker.helpers.arrayElement(dias),
        horario: faker.helpers.arrayElement(horarios),
        capacidadeMaxima: faker.number.int({ min: 10, max: 20 }),
        alunosMatriculadosIds: [],
      });
    }

    return lista;
  }

  listarTurmas(): Turma[] {
    return this.turmas();
  }
  matricularAluno(turmaId: number, alunoId: number): void {
    this.turmas.update((lista) =>
      lista.map((turma) =>
        turma.id === turmaId
          ? { ...turma, alunosMatriculadosIds: [...turma.alunosMatriculadosIds, alunoId] }
          : turma,
      ),
    );
  }
}
