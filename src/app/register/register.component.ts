import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private router: Router, private userService: UserService) {}

  password = '';
  email = '';
  username = '';
  error = '';

  submitRegister() {
    this.userService
      .register(this.username, this.email, this.password)
      .subscribe((data: HttpResponse<any>) => {
        console.log(data);
        if (data.ok) {
          if (typeof window !== 'undefined')
            localStorage.setItem('username', this.username);
          this.router.navigateByUrl('/groups');
        } else if (data.status == 400) {
          this.error = 'Username already exists, please try a different one';
        } else {
          this.error = 'We are having some techincal difficulties';
        }
      });
  }

  handleLoginRedirect() {
    this.router.navigateByUrl('/');
  }
}
