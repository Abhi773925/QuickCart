import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(public router: Router) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loginFormUrl: string = "http://localhost:5273/api/v1/Auth/login";
  errorText = signal<string>("");

  async handleLoginForm(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log("Error in the Login Form");
    }
    else {

      const { email, password } = this.loginForm.value;
      const payLoad = {
        userEmail: email?.trim(),
        userPassword: password?.trim()
      }

      try {
        let response = await axios.post(this.loginFormUrl, payLoad);
        if (response.status == 200) {

          this.loginForm.reset();

          let token = response.data.data.accessToken;
          localStorage.setItem("accessToken", token);
          this.router.navigate(["/"]);
          alert("Login Successful redirecting to dashboard");
        }
      } catch (error: any) {
        let response = error.response?.data?.message || error.response?.data || "An Unknown Error Occured";
        this.errorText.set(response);
        console.log(response);
      }
    }
  }
}


