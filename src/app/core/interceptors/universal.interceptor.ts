import { REQUEST } from '@nguniversal/express-engine/tokens'
import { Request } from 'express'
import { Observable } from 'rxjs'

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Inject, Injectable, Optional } from '@angular/core'

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(REQUEST) protected request?: Request) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let serverReq: HttpRequest<unknown> = req
    if (this.request && !req.url.startsWith('http')) {
      let newUrl = `${this.request.protocol}://${this.request.get('host')?.replace(/@(.+)?/g, '')}`
      if (!req.url.startsWith('/')) {
        newUrl += '/'
      }

      newUrl += req.url
      serverReq = req.clone({ url: newUrl })
    }

    return next.handle(serverReq)
  }
}
