import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;
  constructor(private formBuilded: FormBuilder,
    private authService: AuthService) {
    this.createLoginForm();
  }

  ngOnInit() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilded.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onLogin(loginForm) {
    if (loginForm.valid) {
      this.email = loginForm.value.email;
      this.password = loginForm.value.password;
      this.authService.logIn(this.email, this.password);
      this.loginForm.reset();
    }
  }
}
