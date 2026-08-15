import { Injectable, signal, effect } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Instrutor } from '../models/instrutor';

@Injectable({ providedIn: 'root' })
export class InstrutorService {
  private chaveStorage = 'academia-instrutores';

  private instrutores = signal<Instrutor[]>(this.carregarInstrutores());

  constructor() {
    effect(() => {
      localStorage.setItem(this.chaveStorage, JSON.stringify(this.instrutores()));
    });
  }

  private carregarInstrutores(): Instrutor[] {
    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }

    return this.gerarInstrutoresFake();
  }

  private gerarInstrutoresFake(): Instrutor[] {
    const especialidades = ['Musculação', 'Crossfit', 'Yoga', 'Pilates', 'Natação'];
    const lista: Instrutor[] = [];

    for (let i = 1; i <= 5; i++) {
      lista.push({
        id: i,
        nome: faker.person.fullName(),
        especialidade: especialidades[i - 1],
      });
    }

    return lista;
  }

  listarInstrutores(): Instrutor[] {
    return this.instrutores();
  }
}
