import { TestBed } from '@angular/core/testing';
import { TurmaService } from './turma';

describe('TurmaService', () => {
  let service: TurmaService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurmaService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve gerar 8 turmas fake ao ser criado', () => {
    const turmas = service.listarTurmas();
    expect(turmas.length).toBe(8);
  });

  it('cada turma deve começar sem alunos matriculados', () => {
    const turmas = service.listarTurmas();
    turmas.forEach((turma) => {
      expect(turma.alunosMatriculadosIds.length).toBe(0);
    });
  });

  it('capacidade máxima deve estar entre 10 e 20', () => {
    const turmas = service.listarTurmas();
    turmas.forEach((turma) => {
      expect(turma.capacidadeMaxima).toBeGreaterThanOrEqual(10);
      expect(turma.capacidadeMaxima).toBeLessThanOrEqual(20);
    });
  });
});
