import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar implements OnInit {
  isMenuOpen = signal<boolean>(false);
  isLoggedIn = signal<boolean>(false);
  email = signal<string>("");
  isProfileOpen = signal<boolean>(false);
  isAdmin = signal<boolean>(false);
  ngOnInit(): void {
    // Page load hote hi sirf check karo, redirect mat karo
    this.checkStatus();

  }

  checkStatus(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {

      this.isLoggedIn.set(true);
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const userEmail = tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const userId = tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const role = tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.email.set(userEmail);
      if (role === "Admin") {
        this.isAdmin.set(true);
      }


    } else {
      this.isLoggedIn.set(false);
    }
  }

  handleLogout(): void {
    localStorage.removeItem('accessToken');
    this.isLoggedIn.set(false);
    window.location.href = '/login';
  }


}