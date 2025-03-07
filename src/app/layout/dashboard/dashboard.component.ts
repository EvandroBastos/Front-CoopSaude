import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, ApexChart, ApexAxisChartSeries, ApexXAxis } from 'ng-apexcharts';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartComponent, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  // Opção 1: Inicialização Direta com Valores Padrões
  chartOptions: ApexChart = { type: 'bar', height: 350 };
  chartSeries: ApexAxisChartSeries = [
    {
      name: 'Sales',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ];
  xAxis: ApexXAxis = {
    categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro']
  };

  // Opção 2: Utilizando o `!` para Inicialização Posterior
  lineChart!: any;
  chart: ApexChart = {
    type: 'line',
    height: 350
  };

  ngOnInit() {
    this.users = [
      { id: 1, name: 'Evandro Bastos', email: 'evandrobastosviana@gmail.com', role: 'Cooperado' },
      { id: 2, name: 'Marcelo Morais', email: 'marcelomorais@example.com', role: 'Pessoa Cadastrada' }
    ];

    this.chartOptions = {
      type: 'bar',
      height: 350
    };

    this.chartSeries = [
      {
        name: 'Sales',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ];

    this.xAxis = {
      categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro']
    };

    this.lineChart = {
      series: [
        {
          name: "Sales",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      xaxis: {
        categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro']
      }
    };
  }
}
