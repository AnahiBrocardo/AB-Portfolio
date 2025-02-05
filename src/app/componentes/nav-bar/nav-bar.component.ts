import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraduccionService } from '../../servicios/traduccion.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  contacto: string = '';
  proyectos: string = '';
  habilidades: string = '';
  menuOpen: boolean = false;

  constructor(private traduccionService: TraduccionService) {}

  async ngOnInit(): Promise<void> {
    await this.setTranslations();
  }

  scrollToProjects() {
    const element = document.getElementById('proyectos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact() {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToSkill() {
    const element = document.getElementById('habilidades');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async setTranslations(): Promise<void> {
    this.contacto = await this.traduccionService.translate('NAVBAR.CONTACTO');
    this.proyectos = await this.traduccionService.translate('NAVBAR.PROYECTOS');
    this.habilidades = await this.traduccionService.translate('NAVBAR.HABILIDADES');
  }

  async toggleLanguage(): Promise<void> {
    const newLang = this.traduccionService.getCurrentLang() === 'es' ? 'en' : 'es';
    await this.traduccionService.setLang(newLang);
    await this.setTranslations(); // Actualizamos las traducciones
  }

  getCurrentLang(): string {
    return this.traduccionService.getCurrentLang();
  }
}
