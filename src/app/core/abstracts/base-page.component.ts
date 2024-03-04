import { Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

import { Page } from 'src/app/core/interfaces/page'
import { LangService } from 'src/app/core/services/lang.service'

import { PageModel } from 'src/app/shared/modules/page/models/page.model'

@Component({
  template: '',
})
export abstract class BasePageComponent implements OnInit, OnDestroy {
  page?: Page<unknown> | PageModel<unknown>
  data?: unknown

  langSubscription?: Subscription

  constructor(protected langService: LangService, protected titleService: Title, protected metaService: Meta) {}

  ngOnInit(): void {
    this.langSubscription = this.langService.langChanged.subscribe(() => {
      this.renderPageMeta()
    })
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe()
  }

  // TODO: why we use some "data" here instead of just "page" ?
  setBaseData(data: Page<unknown> | PageModel<unknown>): void {
    this.data = data
    this.page = data
  }

  renderPageMeta(): void {
    if (this.page?.metaData) {
      if (this.page.metaData.ogImageUrl && typeof this.page.metaData.ogImageUrl !== 'undefined') {
        this.metaService.updateTag({
          property: 'og:image',
          content: this.page.metaData.ogImageUrl,
        })
        this.metaService.updateTag({
          property: 'twitter:image:src',
          content: this.page.metaData.ogImageUrl,
        })
      }

      if (typeof this.page.metaData.ogVideoUrl !== 'undefined') {
        this.metaService.updateTag({
          property: 'og:video',
          content: this.page.metaData.ogVideoUrl,
        })
        this.metaService.updateTag({
          property: 'twitter:player:stream',
          content: this.page.metaData.ogVideoUrl,
        })
        this.metaService.updateTag({
          property: 'twitter:player:stream:content_type',
          content: 'video/mp4',
        })
      }

      if (this.page.metaData.title && typeof this.page.metaData.title !== 'undefined') {
        this.titleService.setTitle(this.page.metaData.title)
        this.metaService.updateTag({
          property: 'og:title',
          content: this.page.metaData.title,
        })
        this.metaService.updateTag({
          property: 'apple-mobile-web-app-title',
          content: this.page.metaData.title,
        })
        this.metaService.updateTag({
          property: 'twitter:image:alt',
          content: this.page.metaData.title,
        })
      }

      if (this.page.metaData.ogTitle && typeof this.page.metaData.ogTitle !== 'undefined') {
        this.metaService.updateTag({
          property: 'og:title',
          content: this.page.metaData.ogTitle,
        })
      }

      if (this.page.metaData.description && typeof this.page.metaData.description !== 'undefined') {
        this.metaService.updateTag({
          name: 'description',
          content: this.page.metaData.description,
        })
        this.metaService.updateTag({
          property: 'og:description',
          content: this.page.metaData.description,
        })
      }

      if (this.page.metaData.ogDescription && typeof this.page.metaData.ogDescription !== 'undefined') {
        this.metaService.updateTag({
          property: 'og:description',
          content: this.page.metaData.ogDescription,
        })
      }

      if (this.page.metaData.keywords && typeof this.page.metaData.keywords !== 'undefined') {
        this.metaService.updateTag({
          property: 'keywords',
          content: this.page.metaData.keywords,
        })
      }
    }
  }
}
