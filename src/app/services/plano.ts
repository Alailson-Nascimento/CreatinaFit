import { Injectable, signal, effect } from '@angular/core';
import { Plano } from '../models/plano';

@Injectable({ providedIn: 'root' })
export class PlanoService {
  private chaveStorage = 'academia-planos';

  private planos = signal<Plano[]>(this.carregarPlanos());

  constructor() {
    effect(() => {
      localStorage.setItem(this.chaveStorage, JSON.stringify(this.planos()));
    });
  }

  private carregarPlanos(): Plano[] {
    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }

    return this.planosIniciais();
  }

  private planosIniciais(): Plano[] {
    return [
      { id: 1, nome: 'Mensal', valor: 120, duracaoEmDias: 30, aulasPorSemana: 3 },
      { id: 2, nome: 'Trimestral', valor: 320, duracaoEmDias: 90, aulasPorSemana: 4 },
      { id: 3, nome: 'Anual', valor: 1100, duracaoEmDias: 365, aulasPorSemana: 5 },
    ];
  }

  listarPlanos(): Plano[] {
    return this.planos();
  }
}
