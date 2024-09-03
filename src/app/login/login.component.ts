import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!!this.authService.user) {
      this.router.navigateByUrl('/groups');
    }
  }

  username = '';
  password = '';
  errorMessage = '';

  submitLogin = () => {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.body !== undefined) {
          this.authService.user = response.body;
          this.router.navigateByUrl('/groups');
        } else {
          this.errorMessage = 'An error occurred';
          this.cdr.detectChanges();
        }
      },
      (error) => {
        if (error.cause.status === 403) {
          this.errorMessage = 'Incorrect username or password';
        } else {
          this.errorMessage = 'An error occurred';
        }
        this.cdr.detectChanges();
        console.error('Login failed', error);
      }
    );
  };

  handleRegister = () => {
    this.router.navigateByUrl('/register');
  };
}
