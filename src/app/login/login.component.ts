import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    let username =
      typeof window !== 'undefined' ? localStorage.getItem('username') : null;
    if (!!username) {
      this.router.navigateByUrl('/groups');
    }
  }

  username = '';
  password = '';
  error = '';

  submitLogin = () => {
    this.userService.login(this.username, this.password).subscribe((user) => {
      if (!!user) {
        if (typeof window !== 'undefined')
          localStorage.setItem('username', user.username);
        this.router.navigateByUrl('/groups');
      } else {
        this.error = 'Incorrect username or password';
      }
    });
  };
}
