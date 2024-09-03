import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { Group } from '../models/group';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit() {
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
}
