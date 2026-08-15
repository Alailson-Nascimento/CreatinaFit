import { TestBed } from '@angular/core/testing';
import { PlanoService } from './plano';

describe('PlanoService', () => {
  let service: PlanoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve carregar 3 planos iniciais', () => {
    const planos = service.listarPlanos();
    expect(planos.length).toBe(3);
  });

  it('cada plano deve ter valor maior que zero', () => {
    const planos = service.listarPlanos();
    planos.forEach((plano) => {
      expect(plano.valor).toBeGreaterThan(0);
    });
  });

  it('o plano Anual deve ter duração de 365 dias', () => {
    const planos = service.listarPlanos();
    const anual = planos.find((p) => p.nome === 'Anual');
    expect(anual?.duracaoEmDias).toBe(365);
  });
});
