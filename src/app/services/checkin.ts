import { Injectable, signal, effect } from '@angular/core';
import { CheckIn } from '../models/checkin';

@Injectable({ providedIn: 'root' })
export class CheckInService {
  private chaveStorage = 'academia-checkins';

  private checkins = signal<CheckIn[]>(this.carregarCheckins());

  constructor() {
    effect(() => {
      localStorage.setItem(this.chaveStorage, JSON.stringify(this.checkins()));
    });
  }

  private carregarCheckins(): CheckIn[] {
    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if (dadosSalvos) {
      const checkins: CheckIn[] = JSON.parse(dadosSalvos);
      return checkins.map((checkin) => ({
        ...checkin,
        data: new Date(checkin.data),
      }));
    }

    return [];
  }

  listarCheckins(): CheckIn[] {
    return this.checkins();
  }

  registrarCheckin(alunoId: number, turmaId: number): void {
    const novoCheckin: CheckIn = {
      id: this.checkins().length + 1,
      alunoId,
      turmaId,
      data: new Date(),
    };

    this.checkins.update((lista) => [...lista, novoCheckin]);
  }
}
