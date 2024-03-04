import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ErrorService } from 'src/app/core/services/error.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        switch (err.status) {
          case 401:
            break
          case 500:
            if (request.method !== 'GET') {
              // FIXME: remove after getting error code from backend
              this.errorService.triggerModal()
            }

            break
        }

        const error = err.error.message || err.statusText

        return throwError(() => error)
      }),
    )
  }
}
