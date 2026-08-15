import { Component, signal } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { AlunoService } from '../../services/aluno';
import { TurmaService } from '../../services/turma';
import { PlanoService } from '../../services/plano';
import { RegrasNegocioService } from '../../services/regras-negocio';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  totalAlunos = signal(0);
  alunosAtivos = signal(0);
  planosVencidos = signal(0);
  totalTurmas = signal(0);

  graficoTipo: ChartConfiguration<'bar'>['type'] = 'bar';

  graficoDados: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mensal', 'Trimestral', 'Anual'],
    datasets: [
      {
        label: 'Alunos por plano',
        data: [0, 0, 0],
        backgroundColor: '#e60c30',
      },
    ],
  };

  graficoTipoPizza: ChartConfiguration<'pie'>['type'] = 'pie';

  graficoDadosPizza: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }],
  };

  constructor(
    private servicoAluno: AlunoService,
    private servicoTurma: TurmaService,
    private servicoPlano: PlanoService,
    private servicoRegras: RegrasNegocioService,
  ) {
    this.carregarIndicadores();
  }

  private carregarIndicadores(): void {
    const alunos = this.servicoAluno.listarAlunos();
    const turmas = this.servicoTurma.listarTurmas();

    this.totalAlunos.set(alunos.length);
    this.alunosAtivos.set(alunos.filter((a) => a.ativo).length);
    this.totalTurmas.set(turmas.length);

    const vencendo = alunos.filter((a) => this.servicoRegras.planoEstaVencido(a));
    this.planosVencidos.set(vencendo.length);

    const contagemPorPlano = [1, 2, 3].map(
      (planoId) => alunos.filter((a) => a.planoId === planoId).length,
    );

    this.graficoDados = {
      labels: ['Mensal', 'Trimestral', 'Anual'],
      datasets: [
        {
          label: 'Alunos por plano',
          data: contagemPorPlano,
          backgroundColor: '#e60c30',
        },
      ],
    };

    const modalidades = [...new Set(turmas.map((t) => t.modalidade))];
    const contagemPorModalidade = modalidades.map(
      (modalidade) => turmas.filter((t) => t.modalidade === modalidade).length,
    );

    this.graficoDadosPizza = {
      labels: modalidades,
      datasets: [
        {
          data: contagemPorModalidade,
          backgroundColor: ['#e60c30', '#b8092a', '#f472b6', '#7c3aed', '#0a0a0a'],
        },
      ],
    };
  }
}
