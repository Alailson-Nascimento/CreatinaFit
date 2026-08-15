import { TestBed } from '@angular/core/testing';
import { CheckInService } from './checkin';

describe('CheckInService', () => {
  let service: CheckInService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve começar sem nenhum checkin registrado', () => {
    const checkins = service.listarCheckins();
    expect(checkins.length).toBe(0);
  });

  it('deve registrar um novo checkin corretamente', () => {
    service.registrarCheckin(1, 5);

    const checkins = service.listarCheckins();
    expect(checkins.length).toBe(1);
    expect(checkins[0].alunoId).toBe(1);
    expect(checkins[0].turmaId).toBe(5);
  });

  it('deve registrar múltiplos checkins sem sobrescrever os anteriores', () => {
    service.registrarCheckin(1, 5);
    service.registrarCheckin(2, 5);
    service.registrarCheckin(3, 7);

    const checkins = service.listarCheckins();
    expect(checkins.length).toBe(3);
  });
});
