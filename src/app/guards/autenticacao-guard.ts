import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao';

export const guardaAutenticacao: CanActivateFn = () => {
  const servicoAutenticacao = inject(AutenticacaoService);
  const roteador = inject(Router);

  if (servicoAutenticacao.estaLogado()) {
    return true;
  }

  roteador.navigate(['/login']);
  return false;
};
