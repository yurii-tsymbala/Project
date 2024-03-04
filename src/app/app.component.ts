import { AfterViewInit, Component, OnInit } from '@angular/core'

import { AccessibilityService } from 'src/app/core/services/accessibility.service'
import { LangService } from 'src/app/core/services/lang.service'
import { LoaderService } from 'src/app/core/services/loader.service'
import { SsrService } from 'src/app/core/services/ssr.service'

import { ScriptsService } from 'src/app/shared/modules/scripts/services/scripts.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(
    private readonly loaderService: LoaderService,
    private readonly langService: LangService,
    readonly ssrService: SsrService,
    public scriptsService: ScriptsService,
    private accessibilityService: AccessibilityService,
  ) {}

  ngOnInit(): void {
    this.detectLanguage()
    this.accessibilityService.initA11y()
  }

  ngAfterViewInit(): void {
    this.loaderService.hideSiteLoader()
  }

  detectLanguage(): void {
    if (this.ssrService.isBrowser) {
      this.langService.setDocumentLang(this.langService.lang)
    }
  }
}
