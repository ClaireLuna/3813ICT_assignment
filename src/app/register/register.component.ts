import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  password = '';
  email = '';
  username = '';
  errorMessage = '';

  submitRegister() {
    if (this.username && this.email && this.password) {
      this.authService
        .register(this.username, this.email, this.password)
        .subscribe(
          (response) => {
            if (response.body.apiToken !== undefined) {
              this.authService.user = response.body;
              this.router.navigateByUrl('/groups');
            } else {
              this.errorMessage = 'An error occurred';
              this.cdr.detectChanges();
            }
          },
          (error) => {
            if (error.cause.status === 403) {
              this.errorMessage = 'User already exists';
            } else {
              this.errorMessage = 'An error occurred';
            }
            this.cdr.detectChanges();
            console.error('Register failed', error);
          }
        );
    } else {
      this.errorMessage = 'Please fill in missing fields';
      this.cdr.detectChanges();
    }
  }

  handleLoginRedirect() {
    this.router.navigateByUrl('/login');
  }
}
