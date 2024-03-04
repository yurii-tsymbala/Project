import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

import { SsrService } from 'src/app/core/services/ssr.service'

import { environment } from 'src/environments/environment'

export interface WindowWithGA {
  ga: {
    getAll: () => unknown[]
  }
  gtag: (action: string, eventName: string, options?: unknown) => void
}

export interface GATracker {
  set: (varname: string, value: string) => void
  send: (event: string) => void
}

@Injectable({
  providedIn: 'root',
})
export class GaService {
  tracker?: GATracker

  gtag?: (action: string, eventName: string, options?: unknown) => void

  constructor(private readonly ssrService: SsrService, private readonly router: Router) {}

  init(): void {
    const windowWithGA = <WindowWithGA>(<unknown>window)

    if (this.ssrService.isBrowser) {
      if (windowWithGA && 'ga' in windowWithGA) {
        if (windowWithGA.ga.getAll) {
          this.tracker = <GATracker>windowWithGA.ga.getAll()[0]
        }
      }

      if (!this.tracker) {
        if (windowWithGA && 'gtag' in windowWithGA) {
          this.gtag = windowWithGA.gtag
        }
      }

      this.startTrackPages()
    }
  }

  startTrackPages(): void {
    let isFirstTransition = true

    if (this.tracker) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (!isFirstTransition) {
            this.tracker?.set('page', event.urlAfterRedirects)
            this.tracker?.send('pageview')
          } else {
            isFirstTransition = false
          }
        }
      })
    }
  }

  sendEvent(eventName: string, eventOptions?: unknown): void {
    if (this.tracker) {
      this.tracker.send(eventName)
    } else if (this.gtag) {
      if (!environment.production) {
        // eslint-disable-next-line no-console
        console.log(`Send GA Event: ${eventName}${eventOptions ? ', ' + JSON.stringify(eventOptions) : ''}`)
      }

      this.gtag('event', eventName, eventOptions || {})
    }
  }
}
