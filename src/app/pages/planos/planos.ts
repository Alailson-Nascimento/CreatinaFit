import { Component } from '@angular/core';
import { PlanoService } from '../../services/plano';
import { Plano } from '../../models/plano';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [],
  templateUrl: './planos.html',
  styleUrl: './planos.scss',
})
export class Planos {
  planos: Plano[];

  constructor(private servicoPlano: PlanoService) {
    this.planos = this.servicoPlano.listarPlanos();
  }
}
