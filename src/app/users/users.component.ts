import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  currentUser?: User | null;
  users: User[] = [];
  userRole: string = '';
  modalError: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response.body;
      },
      (error) => {
        console.error('Failed to get users', error);
      }
    );
  }

  updateUserRole = (id: string) => {
    this.userService.updateUser(id, this.userRole).subscribe(
      (response) => {
        this.users = this.users.map((user) => {
          if (user.id === id) {
            user.role = this.userRole;
          }
          return user;
        });
        this.userRole = '';
        console.log(response);
      },
      (error) => {
        this.modalError = 'Failed to update user';
        console.error('Failed to update user', error);
      }
    );
  };

  deleteUser = (id: string) => {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log(response);
        this.users = this.users.filter((user) => user.id !== id);
      },
      (error) => {
        console.error('Failed to delete user', error);
      }
    );
  };

  routeToDirectMessage = (user: any) => {
    let roomId =
      ('' + this.currentUser?.id).localeCompare(user.id) > 0
        ? user.id + this.currentUser?.id
        : this.currentUser?.id + user.id;
    this.router.navigate(['/channels/detail'], {
      queryParams: {
        channel: roomId,
        name: user.username,
        isDirectMessage: true,
      },
    });
  };
}
