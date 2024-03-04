import { LocalStorageService } from './local-storage.service'

import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core'

import { ContrastMode, FontSizeLevel } from 'src/app/core/interfaces/accessibility'

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  contrastMode!: ContrastMode
  fontSizeLevel!: FontSizeLevel

  fontSizeMap = ['12pt', '14.5pt', '18pt']

  readonly minFontSizeLevel = 0
  readonly maxFontSizeLevel = this.fontSizeMap.length - 1

  storageKeyMap = <const>{
    contrastMode: 'contrastMode',
    fontSizeLevel: 'fontSizeLevel',
  }

  private renderer: Renderer2
  private readonly htmlTag = this.document.documentElement
  private readonly bodyTag = this.document.body

  constructor(
    private localStorage: LocalStorageService,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }

  initA11y(): void {
    const [storedContrastMode, storedFontSizeLevel] = [
      <ContrastMode>this.localStorage.getItem(this.storageKeyMap.contrastMode),
      <FontSizeLevel>this.localStorage.getItem(this.storageKeyMap.fontSizeLevel),
    ]
    if (storedContrastMode) {
      this.contrastMode = storedContrastMode
    } else {
      this.contrastMode = ContrastMode.Color
      this.localStorage.setItem(this.storageKeyMap.contrastMode, this.contrastMode)
    }

    if (storedFontSizeLevel && typeof storedFontSizeLevel === 'number') {
      this.fontSizeLevel = storedFontSizeLevel
    } else {
      this.fontSizeLevel = 0
      this.localStorage.setItem(this.storageKeyMap.fontSizeLevel, this.fontSizeLevel)
    }

    this.renderer.addClass(this.bodyTag, this.contrastMode)
    if (this.contrastMode === ContrastMode.Contrast) {
      this.renderer.setStyle(this.htmlTag, 'font-size', this.fontSizeMap[this.fontSizeLevel])
    }
  }

  setContrast(newContrastMode: ContrastMode): void {
    const prevContrastMode = this.contrastMode !== newContrastMode ? this.contrastMode : undefined

    this.contrastMode = newContrastMode
    this.localStorage.setItem(this.storageKeyMap.contrastMode, this.contrastMode)
    this.renderer.addClass(this.bodyTag, this.contrastMode)
    if (prevContrastMode) {
      this.renderer.removeClass(this.bodyTag, prevContrastMode)
    }

    if (this.contrastMode === ContrastMode.Color) {
      this.disable()
    } else {
      this.setFontSize(this.fontSizeLevel)
    }
  }

  decrementFontSizeLevel(): void {
    this.setFontSize(<FontSizeLevel>(this.fontSizeLevel - 1))
  }

  incrementFontSizeLevel(): void {
    this.setFontSize(<FontSizeLevel>(this.fontSizeLevel + 1))
  }

  private validateFontSizeLevel(newFontSizeLevel: FontSizeLevel): FontSizeLevel {
    if (newFontSizeLevel < 0) {
      return 0
    }

    if (newFontSizeLevel > this.maxFontSizeLevel) {
      return <FontSizeLevel>this.maxFontSizeLevel
    }

    return newFontSizeLevel
  }

  setFontSize(newFontSizeLevel: FontSizeLevel): void {
    if (newFontSizeLevel < 0) {
      return
    }

    this.fontSizeLevel = this.validateFontSizeLevel(newFontSizeLevel)
    this.localStorage.setItem(this.storageKeyMap.fontSizeLevel, this.fontSizeLevel)
    this.renderer.setStyle(this.htmlTag, 'font-size', this.fontSizeMap[this.fontSizeLevel])
  }

  reset(): void {
    this.setFontSize(0)
    this.setContrast(ContrastMode.Color)
  }

  enable(): void {
    this.renderer.addClass(this.bodyTag, this.contrastMode)
    this.renderer.removeClass(this.bodyTag, ContrastMode.Contrast)
    this.renderer.removeClass(this.bodyTag, ContrastMode.Color)
    this.setContrast(this.contrastMode)
    this.setFontSize(this.fontSizeLevel)
  }

  disable(): void {
    this.renderer.removeClass(this.bodyTag, ContrastMode.Contrast)
    this.renderer.addClass(this.bodyTag, ContrastMode.Color)
    this.renderer.setStyle(this.htmlTag, 'font-size', this.fontSizeMap[0])
  }
}
