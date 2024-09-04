import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Channel } from '../models/channel';
import { ChannelService } from '../services/channel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss',
})
export class ChannelsComponent implements OnInit {
  group: Group | undefined;
  channels: Channel[] = [];
  groupId: string = '';
  isAdmin: boolean = false;
  user: User | undefined;
  modalError: string = '';
  channelName: string = '';

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private authService: AuthService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    this.isAdmin =
      this.user?.role === 'Admin' || this.user?.role === 'SuperAdmin';

    this.route.queryParams.subscribe((params) => {
      console.log(params);

      this.groupId = params['group'];
    });
    this.channelService.getChannels(this.groupId).subscribe(
      (response) => {
        console.log(response);
        if (response.body !== null) {
          this.channels = response.body;
        }
      },
      (error) => {
        console.error('Failed to get channels', error);
      }
    );
    this.groupService.getGroup(this.groupId).subscribe(
      (response) => {
        console.log(response);
        this.group = response.body;
      },
      (error) => {
        console.error('Failed to get group', error);
      }
    );
  }

  canDelete(): boolean {
    console.log(this.user);
    return (
      this.user?.role === 'SuperAdmin' ||
      this.group?.createdById === this.user?.id
    );
  }

  handleCreateChannel = () => {
    this.channelService
      .createChannel(this.group?.id || '', this.channelName)
      .subscribe(
        (response) => {
          console.log(response);
          this.channels.push(response.body);

          let modal = document.getElementById('createChannelModal');
          if (modal) {
            modal.classList.add('hidden');
          }
          this.channelName = '';
        },
        (error) => {
          this.modalError = 'Failed to create channel';
          console.error('Create channel failed', error);
        }
      );
  };

  handleDeleteChannel = (channelId: string) => {
    this.channelService.deleteChannel(channelId).subscribe(
      (response) => {
        console.log(response);
        this.channels = this.channels.filter(
          (channels) => channels.id !== channelId
        );
      },
      (error) => {
        console.error('Delete channel failed', error);
      }
    );
  };
}
