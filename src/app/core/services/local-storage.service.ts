import { Injectable } from '@angular/core'

import { SsrService } from 'src/app/core/services/ssr.service'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private ssrService: SsrService) {}

  getItem<T>(key: string): T | string | undefined {
    if (!this.ssrService.isBrowser) {
      return undefined
    }

    const value = localStorage.getItem(key)

    try {
      return JSON.parse(value || 'undefined')
    } catch (e) {
      return value === null ? undefined : value
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.ssrService.isBrowser) {
      return
    }

    if (['string', 'number', 'boolean'].includes(typeof value)) {
      localStorage.setItem(key, <string>value)

      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  }

  removeItem(key: string): void {
    if (!this.ssrService.isBrowser) {
      return
    }

    localStorage.removeItem(key)
  }

  clear(): void {
    if (!this.ssrService.isBrowser) {
      return
    }

    localStorage.clear()
  }
}
