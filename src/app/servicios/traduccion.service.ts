import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraduccionService {
  private currentLang = 'es';
  langChange$: any;
  constructor(private translateService: TranslateService, private http: HttpClient) {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');

    this.loadTranslations('es');
    this.loadTranslations('en');
  }

  async setLang(lang: string): Promise<void> {
    this.translateService.use(lang);
    await this.loadTranslations(lang);
  }

  async translate(key: string): Promise<string> {
    await this.loadTranslations(this.getCurrentLang());
    return this.translateService.instant(key); 
  }

  getCurrentLang(): string {
    return this.translateService.currentLang || 'es';
  }

  private async loadTranslations(lang: string): Promise<void> {
    const translations = await firstValueFrom(this.http.get(`assets/i18n/${lang}.json`));
    this.translateService.setTranslation(lang, translations, true);
  }

  getTranslations(): Observable<any> {
    return this.http.get(`/assets/i18n/${this.currentLang}.json`);
  }
}