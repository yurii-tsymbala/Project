import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TranslocoModule,
  TranslocoService,
  translocoConfig,
} from '@ngneat/transloco'
import { Observable } from 'rxjs'

import { HttpClient } from '@angular/common/http'
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core'
import { Router } from '@angular/router'

import { environment } from 'src/environments/environment'

export function i18nInitializer(router: Router, transloco: TranslocoService) {
  return (): Observable<Translation> => {
    let lang = environment.availableLangs[0]

    for (let i = 0; i < environment.availableLangs.length; i++) {
      if (window.location.pathname.startsWith(`/${environment.availableLangs[i]}`)) {
        lang = environment.availableLangs[i]
      }
    }

    transloco.setActiveLang(lang)

    return transloco.load(lang)
  }
}

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<Translation> {
    // TODO: some other idea of avoiding caching should be found
    return this.http.get<Translation>(`/assets/i18n/${lang}.json?v=0`)
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: i18nInitializer,
      multi: true,
      deps: [Router, TranslocoService],
    },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: environment.availableLangs,
        defaultLang: environment.availableLangs[0],
        fallbackLang: environment.availableLangs[0],
        reRenderOnLangChange: true,
        prodMode: environment.production,
        missingHandler: {
          allowEmpty: true,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
