import { Component, OnInit } from '@angular/core';
import { HomeApiService } from '../../../services/home-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private homeApiService: HomeApiService) {}

  ngOnInit(): void {
    this.configureForm();
  }

  onSubmit(): void {
    const emailInput = this.loginForm.value.emailInput;

    if (this.loginForm.valid) {
      // this.homeApiService.logIn(emailInput);
    }
  }

  private configureForm(): void {
    this.loginForm = new FormGroup({
      emailInput: this.emailFormControl
    });
  }
}
