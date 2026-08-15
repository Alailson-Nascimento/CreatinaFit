import { TestBed } from '@angular/core/testing';
import { AutenticacaoService } from './autenticacao';

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacaoService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve começar deslogado', () => {
    expect(service.estaLogado()).toBe(false);
  });

  it('deve fazer login com credenciais corretas', () => {
    const resultado = service.login('admin@creatinafit.com', '123456');

    expect(resultado).toBe(true);
    expect(service.estaLogado()).toBe(true);
    expect(service.getUsuarioLogado()?.tipo).toBe('admin');
  });

  it('não deve fazer login com senha errada', () => {
    const resultado = service.login('admin@creatinafit.com', 'senhaerrada');

    expect(resultado).toBe(false);
    expect(service.estaLogado()).toBe(false);
  });

  it('deve fazer logout corretamente', () => {
    service.login('aluno@creatinafit.com', '123456');
    expect(service.estaLogado()).toBe(true);

    service.logout();
    expect(service.estaLogado()).toBe(false);
    expect(service.getUsuarioLogado()).toBe(null);
  });
});
