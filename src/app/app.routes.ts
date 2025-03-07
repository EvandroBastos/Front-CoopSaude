import { Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { HomeComponent } from './gestao-pessoas/pages/proponentes-home/proponentes-home.component';
import { ProponenteCadastrosComponent } from './gestao-pessoas/pages/proponentes-cadastros/proponentes-cadastros.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gestao-pessoas', component: HomeComponent },
  { path: 'gestao-pessoas/cadastro', component: ProponenteCadastrosComponent },
];
