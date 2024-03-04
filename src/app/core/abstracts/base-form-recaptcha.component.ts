import { ReCaptchaV3Service } from 'ng-recaptcha'
import { Subscription } from 'rxjs'

import { HttpErrorResponse } from '@angular/common/http'
import { Injectable, OnDestroy } from '@angular/core'

import { BaseFormComponent } from 'src/app/core/abstracts/base-form.component'

import { environment } from 'src/environments/environment'

@Injectable()
export abstract class BaseFormRecaptchaComponent extends BaseFormComponent implements OnDestroy {
  protected abstract recaptchaService: ReCaptchaV3Service

  protected recaptchaTokenSubscription?: Subscription

  override ngOnDestroy(): void {
    super.ngOnDestroy()
    if (this.recaptchaTokenSubscription) {
      this.recaptchaTokenSubscription.unsubscribe()
    }
  }

  override submit(): void {
    this.submitPrepare()
    if (this.formGroup.valid) {
      this.isPending = true
      this.recaptchaTokenSubscription = this.recaptchaService.execute('formSubmit').subscribe({
        next: (token) => {
          if (!environment.production) {
            // eslint-disable-next-line no-console
            console.log(`Recaptcha token: ${token}`)
          }

          this.formGroup.get('recaptcha')?.patchValue(token)
          this.send()
        },
        error: (error) => {
          this.formGroup.get('recaptcha')?.setErrors({ incorrect: true })
          this.onRequestFailed(
            new HttpErrorResponse({
              error: {
                recaptcha: error?.message || error,
              },
              status: 500,
            }),
          )
        },
      })
    } else {
      this.scrollToError()
    }
  }

  override onRequestFinal(): void {
    this.recaptchaTokenSubscription?.unsubscribe()
    super.onRequestFinal()
  }
}
