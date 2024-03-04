import { Subject } from 'rxjs'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorModalSubject = new Subject<void>()
  showModal$ = this.errorModalSubject.asObservable()

  triggerModal(): void {
    this.errorModalSubject.next()
  }
}
