import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core'

import { SsrService } from 'src/app/core/services/ssr.service'

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private renderer: Renderer2

  private readonly bodyRef: ElementRef
  private readonly siteLoaderRef?: ElementRef

  private hideTimeout?: NodeJS.Timeout

  constructor(private readonly ssrSerice: SsrService, private readonly rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null)
    this.bodyRef = new ElementRef(document.body)
    if (document.getElementById('site-loader')) {
      this.siteLoaderRef = new ElementRef(document.getElementById('site-loader'))
    }
  }

  showSiteLoader(): void {
    if (this.ssrSerice.isBrowser) {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
        this.hideTimeout = undefined
      }

      this.renderer.setStyle(this.siteLoaderRef, 'display', 'block')
      this.renderer.removeClass(this.bodyRef.nativeElement, 'loaded')
    }
  }

  hideSiteLoader(): void {
    if (this.siteLoaderRef) {
      if (this.ssrSerice.isBrowser) {
        this.hideTimeout = setTimeout(() => {
          window.onscroll = (): void => {}

          this.renderer.addClass(this.bodyRef.nativeElement, 'loaded')
          this.hideTimeout = setTimeout(() => {
            this.renderer.setStyle(this.siteLoaderRef?.nativeElement, 'display', 'none')
          }, 1000)
        }, 1000)
      } else {
        this.renderer.setStyle(this.siteLoaderRef?.nativeElement, 'display', 'none')
      }
    }
  }
}
