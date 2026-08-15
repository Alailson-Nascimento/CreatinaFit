import { TestBed } from '@angular/core/testing';
import { InstrutorService } from './instrutor';

describe('InstrutorService', () => {
  let service: InstrutorService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrutorService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve gerar 5 instrutores fake ao ser criado', () => {
    const instrutores = service.listarInstrutores();
    expect(instrutores.length).toBe(5);
  });

  it('cada instrutor deve ter uma especialidade diferente', () => {
    const instrutores = service.listarInstrutores();
    const especialidades = instrutores.map((i) => i.especialidade);
    const especialidadesUnicas = new Set(especialidades);
    expect(especialidadesUnicas.size).toBe(5);
  });
});
