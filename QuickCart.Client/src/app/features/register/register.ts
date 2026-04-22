import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerDetails = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    userRole: new FormControl('', Validators.required)
  });
  errorText = signal<string>("");
  successText = signal<string>("");
  roleOptions = [
    { name: 'User', value: 1 },
    { name: 'Admin', value: 2 }
  ];
  async handleRegisterDetails(): Promise<void> {
    if (this.registerDetails.valid) {

      const { userName, userEmail, userPassword, userRole } = this.registerDetails.value;
      const payLoad = {
        userName: userName?.trim(),
        userEmail: userEmail?.trim(),
        userPassword: userPassword?.trim(),
        userRole: Number(userRole)
      }
      const registerUrls = "http://localhost:5273/api/v1/Auth/register";

      try {
        const response = await axios.post(registerUrls, payLoad);
        if (response.status == 201) {
          alert("Account Created Succesfully");
          this.successText.set("Account Created Successfully");
          this.registerDetails.reset();
        }

      } catch (error: any) {
        this.errorText.set(error.response?.data?.message || error.response?.data || "Something went wrong");
        console.log("Backend Error Data:", error.response.data);
      }

    } else {
      this.registerDetails.markAllAsTouched();
      console.warn('Form is invalid. Please check the errors.');
    }
  }
}
