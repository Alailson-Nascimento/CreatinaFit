import { TestBed } from '@angular/core/testing';
import { RegrasNegocioService } from './regras-negocio';
import { Aluno } from '../models/aluno';
import { Turma } from '../models/turma';
import { CheckIn } from '../models/checkin';

describe('RegrasNegocioService', () => {
  let service: RegrasNegocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegrasNegocioService);
  });

  it('regra 1: deve identificar plano vencido', () => {
    const alunoVencido: Aluno = {
      id: 1,
      nome: 'Teste',
      email: 'teste@email.com',
      planoId: 1,
      dataMatricula: new Date('2025-01-01'),
      dataVencimentoPlano: new Date('2025-02-01'),
      ativo: true,
    };

    expect(service.planoEstaVencido(alunoVencido)).toBe(true);
  });

  it('regra 1: não deve marcar como vencido um plano válido', () => {
    const alunoEmDia: Aluno = {
      id: 2,
      nome: 'Teste 2',
      email: 'teste2@email.com',
      planoId: 1,
      dataMatricula: new Date(),
      dataVencimentoPlano: new Date('2027-01-01'),
      ativo: true,
    };

    expect(service.planoEstaVencido(alunoEmDia)).toBe(false);
  });

  it('regra 2: deve identificar turma lotada', () => {
    const turmaLotada: Turma = {
      id: 1,
      modalidade: 'Yoga',
      instrutorId: 1,
      diaSemana: 'Segunda',
      horario: '08:00',
      capacidadeMaxima: 2,
      alunosMatriculadosIds: [10, 20],
    };

    expect(service.turmaEstaLotada(turmaLotada)).toBe(true);
  });

  it('regra 3: deve identificar checkin duplicado no mesmo dia', () => {
    const hoje = new Date();
    const checkins: CheckIn[] = [{ id: 1, alunoId: 5, turmaId: 3, data: hoje }];

    expect(service.alunoJaFezCheckinHoje(5, 3, checkins)).toBe(true);
  });

  it('regra 4: deve identificar conflito de horário do instrutor', () => {
    const turmaExistente: Turma = {
      id: 1,
      modalidade: 'Yoga',
      instrutorId: 7,
      diaSemana: 'Terça',
      horario: '09:00',
      capacidadeMaxima: 15,
      alunosMatriculadosIds: [],
    };

    const novaTurma: Turma = {
      id: 2,
      modalidade: 'Pilates',
      instrutorId: 7,
      diaSemana: 'Terça',
      horario: '09:00',
      capacidadeMaxima: 15,
      alunosMatriculadosIds: [],
    };

    expect(service.instrutorTemConflitoHorario(novaTurma, [turmaExistente])).toBe(true);
  });

  it('regra 5: deve identificar conflito de horário do aluno', () => {
    const turmaDoAluno: Turma = {
      id: 1,
      modalidade: 'Yoga',
      instrutorId: 1,
      diaSemana: 'Quarta',
      horario: '19:00',
      capacidadeMaxima: 15,
      alunosMatriculadosIds: [50],
    };

    const novaTurma: Turma = {
      id: 2,
      modalidade: 'Crossfit',
      instrutorId: 2,
      diaSemana: 'Quarta',
      horario: '19:00',
      capacidadeMaxima: 15,
      alunosMatriculadosIds: [],
    };

    expect(service.alunoTemConflitoHorario(50, novaTurma, [turmaDoAluno])).toBe(true);
  });

  it('regra 6: deve calcular nova data de vencimento a partir de hoje', () => {
    const novaData = service.calcularNovaDataVencimento(30);
    const hoje = new Date();
    const diferencaDias = Math.round((novaData.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

    expect(diferencaDias).toBe(30);
  });

  it('regra 7: não deve aceitar valor negativo ou zero', () => {
    expect(service.valorEhValido(-10)).toBe(false);
    expect(service.valorEhValido(0)).toBe(false);
    expect(service.valorEhValido(100)).toBe(true);
  });
});
