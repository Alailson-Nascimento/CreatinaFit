import { Routes } from '@angular/router';
import { guardaAutenticacao } from './guards/autenticacao-guard';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Alunos } from './pages/alunos/alunos';
import { Turmas } from './pages/turmas/turmas';
import { Planos } from './pages/planos/planos';
import { Checkin } from './pages/checkin/checkin';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [guardaAutenticacao] },
  { path: 'alunos', component: Alunos, canActivate: [guardaAutenticacao] },
  { path: 'turmas', component: Turmas, canActivate: [guardaAutenticacao] },
  { path: 'planos', component: Planos, canActivate: [guardaAutenticacao] },
  { path: 'checkin', component: Checkin, canActivate: [guardaAutenticacao] },
];
