import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SsrService {
  isBrowser = false

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId)
  }
}
