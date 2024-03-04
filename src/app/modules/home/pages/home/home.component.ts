import { Component } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'

import { BasePageComponent } from 'src/app/core/abstracts/base-page.component'
import { LangService } from 'src/app/core/services/lang.service'
import { SsrService } from 'src/app/core/services/ssr.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BasePageComponent {
  constructor(
    protected override readonly titleService: Title,
    protected override readonly metaService: Meta,
    protected override readonly langService: LangService,
    readonly ssrService: SsrService,
    private readonly route: ActivatedRoute,
  ) {
    super(langService, titleService, metaService)

    // this.route.data.pipe(takeUntilDestroyed()).subscribe((data) => {
    //   if (data?.home) {
    //     this.setBaseData(data?.home)
    //   }

    //   this.renderPageMeta()
    // })
  }
}
