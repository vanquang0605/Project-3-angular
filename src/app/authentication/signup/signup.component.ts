import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  email: string;
  password: string;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  createRegisterForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSignUp(registerForm) {
    if (registerForm.valid) {
      this.email = registerForm.value.email;
      this.password = registerForm.value.password;
      this.authService.signUp(this.email, this.password);
      this.signupForm.reset();
    }
  }
}
