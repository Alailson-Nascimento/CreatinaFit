import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  mensagemErro = '';
  formulario: FormGroup;

  constructor(
    private construtorFormulario: FormBuilder,
    private servicoAutenticacao: AutenticacaoService,
    private roteador: Router,
  ) {
    this.formulario = this.construtorFormulario.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  entrar(): void {
    if (this.formulario.invalid) {
      this.mensagemErro = 'Preencha email e senha corretamente.';
      return;
    }

    const { email, senha } = this.formulario.value;
    const sucesso = this.servicoAutenticacao.login(email!, senha!);

    if (sucesso) {
      this.mensagemErro = '';
      this.roteador.navigate(['/dashboard']);
    } else {
      this.mensagemErro = 'Email ou senha incorretos.';
    }
  }
}
