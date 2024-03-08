import { Component, OnInit } from '@angular/core';
import { HomeApiService } from '../../../services/home-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss'],
})
export class HomeNewsComponent implements OnInit {
  loginForm!: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private homeApiService: HomeApiService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    this.configureForm();
  }

  onSubmit(content: any): void {
    const emailInput = this.loginForm.value.emailInput;

    // if (this.loginForm.valid) {
      // this.homeApiService.logIn(emailInput);
      this.modalService.open(content);
    // }
  }

  private configureForm(): void {
    this.loginForm = new FormGroup({
      emailInput: this.emailFormControl,
    });
  }
}
