import { TranslocoService } from '@ngneat/transloco'

import { LocalStorageService } from './local-storage.service'

import { DOCUMENT, Location } from '@angular/common'
import { EventEmitter, Inject, Injectable } from '@angular/core'

import { SsrService } from 'src/app/core/services/ssr.service'

@Injectable({
  providedIn: 'root',
})
export class LangService {
  langChanged = new EventEmitter()

  constructor(
    private ssrService: SsrService,
    private localStorage: LocalStorageService,
    private translate: TranslocoService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  get lang(): string {
    return this.translate.getActiveLang()
  }

  get langDefault(): string {
    return this.translate.getDefaultLang()
  }

  setLang(lang: string, auto = false): void {
    this.translate.setActiveLang(lang)
    if (!auto) {
      this.localStorage.setItem('lang', this.lang)
    }

    if (this.ssrService.isBrowser) {
      this.setTranslatedLocation()
    }

    this.setDocumentLang(lang)
    this.langChanged.emit(this.lang)
  }

  setDocumentLang(lang: string): void {
    this.document.documentElement.lang = lang
  }

  getTranslatedUrl(url: string): string {
    const urlArray = url.split('/')

    if (urlArray[1].length === 2) {
      if (this.lang === this.langDefault) {
        urlArray.splice(1, 1)
      } else {
        urlArray[1] = this.lang
      }
    } else {
      if (this.lang !== this.langDefault) {
        urlArray.unshift('')
        urlArray[1] = this.lang
      }
    }

    return urlArray.join('/').replace(/\/$/g, '')
  }

  setTranslatedLocation(): void {
    this.location.go(this.getTranslatedUrl(location.pathname), location.href.split('?')[1] || '')
  }
}
