import { Component, ElementRef, ViewChild } from '@angular/core';
import { HomeApiService } from '../../../services/home-api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/core/abstracts/base-form.component';
import { Observable } from 'rxjs';
import { CustomEmailValidator } from './custom-email.validator';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss'],
})
export class HomeNewsComponent extends BaseFormComponent {
  @ViewChild('form', { static: false })
  protected override elementRef!: ElementRef<any>;
  protected override formBuilder!: FormBuilder;
  override formGroup!: FormGroup<any>;
  emailFormControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    asyncValidators: CustomEmailValidator.createValidator(this.homeApiService),
  });

  constructor(
    private homeApiService: HomeApiService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    super();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  onSubmit(content: any): void {
    this.submit()
    this.sentSuccess.subscribe(() => {
      this.modalService.open(content)
    })
  }

  override ngOnInit(): void {
    this.configureForm();
  }

  override prepareRequest(): Observable<unknown> {
    const emailInput = this.formGroup.value.emailInput;
    return this.homeApiService.sendValidatedEmail(emailInput);
  }

  private configureForm(): void {
    this.formGroup = new FormGroup({
      emailInput: this.emailFormControl,
    });
  }
}
