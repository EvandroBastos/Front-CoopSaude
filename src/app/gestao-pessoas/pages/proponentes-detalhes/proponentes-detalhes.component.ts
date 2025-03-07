import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Documentos, Proponentes } from '../../../Models/proponentes';

@Component({
  selector: 'app-pessoa-detalhes',
  standalone: true,
  templateUrl: './proponentes-detalhes.component.html',
  styleUrls: ['./proponentes-detalhes.component.css'],
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatIconModule] // Importações necessárias
})
export class ProponentesDetalhesComponent {
  proponente: Proponentes;

  constructor(
    public dialogRef: MatDialogRef<ProponentesDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proponentes
  ) {
    // Garante que `documentos` seja sempre um array para evitar erro de undefined
    this.proponente = data
    ? { ...data, documentos: data.documentos ?? [] }
    : { documentos: [] as Documentos[] } as Proponentes;

  }

  fechar(): void {
    this.dialogRef.close();
  }
}
