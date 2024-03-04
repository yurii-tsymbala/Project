import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appHttpCode]',
})
export class HttpCodeDirective implements OnInit {
  @Input('appHttpCode') httpCode: string | number | undefined

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  setStatusCode(): void {
    const div: HTMLDivElement = this.renderer.createElement('div')

    div.style.display = 'none'
    div.innerHTML = `ssrHttpStatusCode:${this.httpCode}`
    this.renderer.appendChild(this.el.nativeElement, div)
  }

  ngOnInit(): void {
    if (/^\d\d\d$/.test(`${this.httpCode}`)) {
      this.setStatusCode()
    }
  }
}
