import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  constructor(
    public servicoAutenticacao: AutenticacaoService,
    private roteador: Router,
  ) {}

  sair(): void {
    this.servicoAutenticacao.logout();
    this.roteador.navigate(['/login']);
  }
}
