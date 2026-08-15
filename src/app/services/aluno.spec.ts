import { TestBed } from '@angular/core/testing';
import { AlunoService } from './aluno';

describe('AlunoService', () => {
  let service: AlunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoService);
  });
  afterEach(() => {
    localStorage.clear();
  });
  it('deve gerar 15 alunos fake ao ser criado', () => {
    const alunos = service.listarAlunos();
    expect(alunos.length).toBe(15);
  });

  it('cada aluno deve ter um nome e email preenchidos', () => {
    const alunos = service.listarAlunos();
    alunos.forEach((aluno) => {
      expect(aluno.nome).toBeTruthy();
      expect(aluno.email).toBeTruthy();
    });
  });

  it('deve carregar alunos salvos no localStorage em vez de gerar novos', () => {
    const alunoSalvo = [
      {
        id: 99,
        nome: 'Aluno Teste',
        email: 'teste@email.com',
        planoId: 1,
        dataMatricula: new Date('2026-01-01'),
        dataVencimentoPlano: new Date('2026-12-31'),
        ativo: true,
      },
    ];

    localStorage.setItem('academia-alunos', JSON.stringify(alunoSalvo));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunoService);

    const alunos = service.listarAlunos();
    expect(alunos.length).toBe(1);
    expect(alunos[0].nome).toBe('Aluno Teste');
  });
});
