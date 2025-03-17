import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, from, Subscription } from 'rxjs';
import { TraduccionService } from '../../servicios/traduccion.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit, OnDestroy {
  titulo: string = '';  
  herramientasTitulo: string = ''; 
  videojuegosTitulo: string = '';
  langSubscription!: Subscription;

  constructor(private traduccionService: TraduccionService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadTranslations();
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadTranslations(); 
    });
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  loadTranslations(): void {
    forkJoin([
      from(this.traduccionService.translate('SKILLS.TITULO')),
      from(this.traduccionService.translate('HERRAMIENTAS')),
      from(this.traduccionService.translate('VIDEOJUEGOS'))
    ]).subscribe(([titulo, herramientasTitulo,videojuegosTitulo]) => {
      this.titulo = titulo;
      this.herramientasTitulo = herramientasTitulo;
      this.videojuegosTitulo= videojuegosTitulo;
    });
  }
  
}