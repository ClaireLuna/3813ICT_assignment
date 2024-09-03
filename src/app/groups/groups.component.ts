import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { Group } from '../models/group';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit {
  user: User | undefined;
  isAdmin: boolean = false;
  groups: Group[] = [];
  groupName: string = '';
  modalError: string = '';

  constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.user;
    this.isAdmin =
      this.user?.role === 'Admin' || this.user?.role === 'SuperAdmin';

    if (!this.authService.user) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.groupService.getGroups().subscribe(
      (response) => {
        console.log(response);
        if (response.body !== null) {
          this.groups = response.body;
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  handleCreateGroup = () => {
    this.groupService.createGroup(this.groupName).subscribe(
      (response) => {
        console.log(response);
        this.groups.push(response.body);

        let modal = document.getElementById('createGroupModal');
        if (modal) {
          modal.classList.add('hidden');
        }
        this.groupName = '';
      },
      (error) => {
        this.modalError = 'Failed to create group';
        console.error('Create group failed', error);
      }
    );
  };

  handleDeleteGroup = (groupId: string) => {
    this.groupService.deleteGroup(groupId).subscribe(
      (response) => {
        console.log(response);
        this.groups = this.groups.filter((group) => group.id !== groupId);
      },
      (error) => {
        console.error('Delete group failed', error);
      }
    );
  };
}
