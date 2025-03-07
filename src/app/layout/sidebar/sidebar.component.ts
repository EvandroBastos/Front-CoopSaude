import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule], // Adicionar CommonModule aqui
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isDarkMode: boolean = false;
  submenuAberto: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleSubmenu() {
    this.submenuAberto = !this.submenuAberto;
  }
}
