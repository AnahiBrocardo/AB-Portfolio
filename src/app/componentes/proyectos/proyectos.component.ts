import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TraduccionService } from '../../servicios/traduccion.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit, OnDestroy {
  selectedCategory: string = 'all';
  proyectos: any[] = [];
  proyectosFiltrados: any[] = [];
  proyectoSeleccionado: any = null;
  traducciones: any = {};
  langSubscription: any;
  modalAbierto = false;
  enlacesModal: any[] = [];
  titulo: string = '';

  technologyIcons: { [key: string]: string } = {
    angular: 'angular.png',
    javascript: 'javascript.png',
    typescript: 'typescript.png',
    html: 'html.png',
    css: 'css.png',
    bootstrap: 'bootstrap.png',
    java: 'java.png',
    mysql: 'mysql.png',
    springboot: 'springboot.png',
    figma: 'figma.png',
    postman: 'postman.png',
    c: 'c.png'
  };
  
  constructor(
    private traduccionService: TraduccionService,
    private translate: TranslateService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProyectos();
    this.updateTitulo();
    
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      console.log('Idioma cambiado:', this.translate.currentLang); 
      this.loadProyectos(); 
      this.updateTitulo();
    });
  }

  updateTitulo() {
    if (this.translate.currentLang === 'en') {
      this.titulo = 'Projects'; 
    } else {
      this.titulo = 'Proyectos'; 
    }
  }
  

  ngOnDestroy(): void {
    
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }


 
  async loadProyectos() {
    const idioma = this.traduccionService.getCurrentLang();
    const rutaArchivo = `assets/i18n/${idioma}.json`;
  
    try {
      const proyectosData = await firstValueFrom(this.http.get<any>(rutaArchivo));
      
      if (proyectosData.PROYECTOS && typeof proyectosData.PROYECTOS === 'object') {
        this.proyectos = Object.values(proyectosData.PROYECTOS);
      } else {
        
        this.proyectos = [];
      }
  
      this.proyectosFiltrados = [...this.proyectos]; 
    } catch (error) {
      
      this.proyectos = [];
      this.proyectosFiltrados = [];
    }
    
  }
  
  
 
  filterProjects(category: string) {
    this.selectedCategory = category;
    this.proyectosFiltrados = category === 'all' 
      ? this.proyectos 
      : this.proyectos.filter(proyecto => proyecto.CATEGORIA === category);
  }

  mostrarInfoProyecto(id: number) {
    this.proyectoSeleccionado = this.proyectos.find(proyecto => proyecto.id === id);
  }
}