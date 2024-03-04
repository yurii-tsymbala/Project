import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core'

import { GaService } from 'src/app/core/services/ga.service'

@Injectable({
  providedIn: 'root',
})
export abstract class ScriptsService implements OnInit {
  private renderer: Renderer2

  constructor(
    private readonly rendererFactory: RendererFactory2,
    private readonly gaService: GaService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }

  ngOnInit(): void {}

  initScripts(type: string): void {
    if (type === 'analytic') {
      this.initScriptsGA()

      this.gaService.init()
      this.initGtm()
    }
  }

  initScriptsGA(): void {
    const script = this.renderer.createElement('script')
    const scriptGALink = this.renderer.createElement('script')

    scriptGALink.src = 'https://www.googletagmanager.com/gtag/js?id=G-SY435HYNPW'
    scriptGALink.async = true
    script.text = `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-SY435HYNPW');
        `

    this.renderer.appendChild(this.document.body, scriptGALink)
    this.renderer.appendChild(this.document.body, script)
  }

  initGtm(): void {
    const scriptGTMInitLink = this.renderer.createElement('script')
    const noscriptGTMInitLink = this.renderer.createElement('noscript')
    const iframe = this.renderer.createElement('iframe')

    scriptGTMInitLink.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P9CCL46');`

    iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-P9CCL46'
    iframe.height = '0'
    iframe.width = '0'
    iframe.style = 'display:none;visibility:hidden;'

    this.renderer.appendChild(noscriptGTMInitLink, iframe)
    this.renderer.appendChild(this.document.head, scriptGTMInitLink)
    this.renderer.appendChild(this.document.body, noscriptGTMInitLink)
  }

  initScriptsYoutube(): void {
    const scriptSrc = `https://www.youtube.com/iframe_api`
    if (this.document.querySelector(`script[src='${scriptSrc}']`)) {
      return
    }

    const scriptTag = this.renderer.createElement('script')

    scriptTag.src = scriptSrc

    this.renderer.appendChild(this.document.body, scriptTag)
  }
}
