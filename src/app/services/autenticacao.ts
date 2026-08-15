import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {
  private chaveStorage = 'academia-sessao';

  private usuarioLogado = signal<Usuario | null>(this.carregarSessao());

  private usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Admin CreatinaFit',
      email: 'admin@creatinafit.com',
      senha: '123456',
      tipo: 'admin',
    },
    {
      id: 2,
      nome: 'Carlos Instrutor',
      email: 'instrutor@creatinafit.com',
      senha: '123456',
      tipo: 'instrutor',
    },
    { id: 3, nome: 'Ana Aluna', email: 'aluno@creatinafit.com', senha: '123456', tipo: 'aluno' },
  ];

  private carregarSessao(): Usuario | null {
    const dadosSalvos = localStorage.getItem(this.chaveStorage);
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
  }

  login(email: string, senha: string): boolean {
    const usuario = this.usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      this.usuarioLogado.set(usuario);
      localStorage.setItem(this.chaveStorage, JSON.stringify(usuario));
      return true;
    }

    return false;
  }

  logout(): void {
    this.usuarioLogado.set(null);
    localStorage.removeItem(this.chaveStorage);
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioLogado();
  }

  estaLogado(): boolean {
    return this.usuarioLogado() !== null;
  }
}
