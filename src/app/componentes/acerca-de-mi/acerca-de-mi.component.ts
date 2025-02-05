import { Component, OnInit, OnDestroy } from '@angular/core';
import { TraduccionService } from '../../servicios/traduccion.service';
import { TranslateService } from '@ngx-translate/core'; 
import { Subscription, forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-acerca-de-mi',
  standalone: true,
  templateUrl: './acerca-de-mi.component.html',
  styleUrls: ['./acerca-de-mi.component.css']
})
export class AcercaDeMiComponent implements OnInit, OnDestroy {
  nombre: string = 'Anahi Brocardo'; 
  titulo: string = '';   
  descripcion: string = ''; 
  descripcion2: string = ''; 

  texts: string[] = [];  
  displayedText: string = '';
  textIndex: number = 0;
  charIndex: number = 0;
  deleting: boolean = false;
  langSubscription!: Subscription;
  intervalId: any;  

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
    if (this.intervalId) {
      clearInterval(this.intervalId); 
    }
  }

  loadTranslations(): void {
    forkJoin([
      from(this.traduccionService.translate('ABOUT_ME.TITULO')),
      from(this.traduccionService.translate('ABOUT_ME.DESCRIPCION2')),
      from(this.traduccionService.translate('ABOUT_ME.DESCRIPCION'))
    ]).subscribe(([titulo, descripcion, descripcion2]) => {
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.descripcion2 = descripcion2;
      this.texts = [this.nombre, this.titulo]; 
      this.resetTypeEffect(); 
    });
  }

  resetTypeEffect(): void {
    this.displayedText = '';
    this.textIndex = 0;
    this.charIndex = 0;
    this.deleting = false;
    this.startTypingEffect(); 
  }

  startTypingEffect(): void {
    const typingSpeed = 250;  
    const deletingSpeed = 100; 
    
   
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

   
    this.intervalId = setInterval(() => {
      const currentText = this.texts[this.textIndex];
      
      if (this.deleting) {
        this.displayedText = currentText.substring(0, this.charIndex--);
        if (this.charIndex === 0) {
          this.deleting = false;
          this.textIndex = (this.textIndex + 1) % this.texts.length; 

          
          setTimeout(() => {
            this.startTypingEffect();  
          }, 1000); 
        }
      } else {
        this.displayedText = currentText.substring(0, this.charIndex++);
        if (this.charIndex === currentText.length) {
          this.deleting = true;
        }
      }
    }, this.deleting ? deletingSpeed : typingSpeed);
  }

  get descripcionTexto(): string {
    return this.descripcion;
  }

  get descripcionTexto2(): string {
    return this.descripcion2;
  }
}
