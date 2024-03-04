import { Observable, Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { HttpErrorResponse } from '@angular/common/http'
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { environment } from 'src/environments/environment'

@Component({
  template: '',
})
export abstract class BaseFormComponent implements OnInit, OnDestroy {
  @Output() submitted: EventEmitter<unknown> = new EventEmitter()
  @Output() sent: EventEmitter<unknown> = new EventEmitter()
  @Output() sentSuccess: EventEmitter<unknown> = new EventEmitter()
  @Output() sentFailed: EventEmitter<unknown> = new EventEmitter()

  private subscriptionChanges?: Subscription

  protected requestSubscription = new Subscription()

  protected request$?: Observable<unknown>

  isPending = false

  isSubmit = false

  isSent = false

  isSuccess = false

  defaultValues: unknown = {}

  isResetOnSuccess = true

  isResetIsSuccess = true

  isEmitOnPrepare = true

  protected abstract elementRef: ElementRef

  protected abstract formBuilder: FormBuilder

  abstract formGroup: FormGroup

  abstract prepareRequest(): Observable<unknown>

  ngOnInit(): void {
    this.subscriptionChanges = this.formGroup.valueChanges.subscribe(() => {
      this.isSuccess = false
    })
  }

  ngOnDestroy(): void {
    this.subscriptionChanges?.unsubscribe()
  }

  submitPrepare(): void {
    this.isSubmit = true
    this.formGroup.setErrors(null)
    Object.keys(this.formGroup.getRawValue()).forEach((field) => {
      this.formGroup.get(field)?.updateValueAndValidity({ emitEvent: this.isEmitOnPrepare })
    })
    this.formGroup.markAllAsTouched()
  }

  submit(): void {
    this.submitPrepare()
    if (this.formGroup.valid) {
      this.isPending = true
      this.send()
    } else {
      this.scrollToError()
    }
  }

  send(): void {
    if (this.isSent) {
      return
    }

    this.request$ = this.prepareRequest()
    this.isSent = true
    this.requestSubscription = this.request$.pipe(finalize(() => this.onRequestFinal())).subscribe({
      next: (next) => this.onRequestSuccess(next),
      error: (error) => this.onRequestFailed(error),
    })
  }

  onRequestSuccess(value: unknown): void {
    this.sentSuccess.emit(value)
    this.isSubmit = false
    this.isSuccess = true
    if (this.isResetOnSuccess) {
      this.formGroup.reset(this.defaultValues, { emitEvent: false })
    }

    if (this.isResetIsSuccess) {
      setTimeout(() => {
        this.isSuccess = false
      }, 3000)
    }
  }

  onRequestFailed(errorResponse: HttpErrorResponse): void {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.log(errorResponse)
    }

    this.setFormErrors(errorResponse)
    this.sentFailed.emit(this.formGroup.errors)
  }

  onRequestFinal(): void {
    this.isPending = false
    this.isSent = false
    if (this.formGroup.invalid) {
      this.scrollToError()
    }

    this.requestSubscription.unsubscribe()
    this.sent.emit()
  }

  /**
   * Describes how to find validation error keys in object returned by backend
   */
  // TODO: set errorResponse: string | string[], upd LoginPupilFormComponent
  setFormErrors(errorResponse: HttpErrorResponse): void {
    const generalErrors: Record<string, boolean> = {}

    // Nest Errors Handler
    if (errorResponse.error && errorResponse.error.message) {
      if (errorResponse.error.message.forEach) {
        errorResponse.error.message.forEach((message: { property?: string } | string) => {
          const property = (<{ property?: string }>message)?.property || <string>message

          if (this.formGroup.get(property)) {
            this.formGroup.get(property)?.setErrors({ invalid: true })
          } else {
            generalErrors[property] = true
          }
        })
      } else {
        generalErrors[errorResponse.error.message] = true
      }
    }

    // Laravel Errors Handler
    if (errorResponse.error?.errors) {
      for (const [property, value] of Object.entries(errorResponse.error.errors)) {
        if (this.formGroup.get(property.toString())) {
          ;(<string[]>value).forEach((rule) => {
            this.formGroup.get(property.toString())?.setErrors({ [rule]: true })
          })
        } else {
          generalErrors[property.toString()] = true
        }
      }
    }

    if (errorResponse.status === 0 || errorResponse.status >= 400) {
      if (!Object.keys(generalErrors)) {
        generalErrors.server = true
      }
    }

    this.formGroup.setErrors(generalErrors)
  }

  scrollToError(): void {
    setTimeout(() => {
      const invalidInput = this.elementRef.nativeElement.querySelector('.form-error > p')
      if (invalidInput) {
        invalidInput.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  validateNestedFormGroup(formGroupName: string): boolean {
    this.formGroup.get(formGroupName)?.markAllAsTouched()
    Object.keys((<FormGroup>this.formGroup.get(formGroupName)).getRawValue()).forEach((field) => {
      this.formGroup.get(formGroupName)?.get(field)?.markAsDirty()
      this.formGroup.get(formGroupName)?.get(field)?.updateValueAndValidity({ emitEvent: this.isEmitOnPrepare })
    })
    this.formGroup.get(formGroupName)?.updateValueAndValidity()
    this.isSubmit = true

    return this.formGroup.get(formGroupName)?.valid || false
  }
}
