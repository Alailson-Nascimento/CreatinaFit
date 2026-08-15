import { TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { AutenticacaoService } from '../../services/autenticacao';
import { provideRouter } from '@angular/router';

describe('Menu', () => {
  let component: Menu;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o menu', () => {
    expect(component).toBeTruthy();
  });
});
