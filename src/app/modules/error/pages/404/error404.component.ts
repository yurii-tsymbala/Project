import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core'

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
})
export class Error404Component implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}
  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'page-404')
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'page-404')
  }
}
