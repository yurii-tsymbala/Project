/* eslint-disable @typescript-eslint/no-var-requires */
import { Observable, of, throwError } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from 'src/environments/environment'

@Injectable()
export class BuiltinApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(
      mergeMap(() => {
        let assetPath
        if (request.method === 'GET') {
          assetPath = environment.builtinApi.get.find((path) => request.url.endsWith(path))
          if (assetPath) {
            return this.ok(require(`src/assets/data${assetPath}`).data)
          }
        }

        if (request.method === 'POST') {
          assetPath = environment.builtinApi.post.find((path) => request.url.endsWith(path))
          if (assetPath) {
            return this.ok(require(`src/assets/data${assetPath}`).data)
          }
        }

        return next.handle(request)
      }),
    )
  }

  private ok(body: unknown): Observable<HttpResponse<unknown>> {
    return of(new HttpResponse({ status: 200, body }))
  }

  private unauthorized(): Observable<never> {
    return throwError(() => new HttpErrorResponse({ status: 401, error: { message: 'Unauthorised' } }))
  }

  private error(message: unknown): Observable<never> {
    return throwError(() => new HttpErrorResponse({ status: 400, error: { message } }))
  }
}

export const BuiltinApidProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BuiltinApiInterceptor,
  multi: true,
}
