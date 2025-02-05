import { Component } from '@angular/core';
import { TraduccionService } from '../../servicios/traduccion.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  mensaje: string = '';   
  texto1: string = ''; 
  correo: string='';
  texto2: string='';
  langSubscription: any;

   constructor(private traduccionService: TraduccionService, private translate: TranslateService) {}
  
    ngOnInit(): void {
      this.loadTranslations();
      this.langSubscription = this.translate.onLangChange.subscribe(() => {
        this.loadTranslations(); 
      });
    }

     loadTranslations(): void {
        forkJoin([
          from(this.traduccionService.translate('CONTACTO.MENSAJE')),
          from(this.traduccionService.translate('CONTACTO.CORREO')),
          from(this.traduccionService.translate('CONTACTO.TEXTO1')),
          from(this.traduccionService.translate('CONTACTO.TEXTO2'))
        ]).subscribe(([mensaje,correo,texto1,texto2]) => {
          this.mensaje = mensaje;
          this.correo = correo;
          this.texto1 = texto1;
          this.texto2 = texto2;
          
        });
      }
}
