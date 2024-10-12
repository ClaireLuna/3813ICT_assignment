import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageResponse, SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ChannelService } from '../services/channel.service';
import { UserService } from '../services/user.service';
import { apiUrl } from '../../constants';

@Component({
  selector: 'app-channel-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './channel-details.component.html',
  styleUrl: './channel-details.component.scss',
})
export class ChannelDetailsComponent implements OnInit {
  ioSubsription: any;
  channelId: string = '';
  messages: MessageResponse[] = [];
  newMessage: string = '';
  newImage: string = '';
  currentUserId: string = '';
  channel: any;
  name: string = '';
  isDirectMessage: boolean = false;
  apiUrl = apiUrl;

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private authService: AuthService,
    private channelService: ChannelService,
    private userService: UserService,
    private router: Router
  ) {
    if (!this.authService.user) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.currentUserId = this.authService.user?.id || '';

    this.route.queryParams.subscribe((params) => {
      this.channelId = params['channel'];
      this.name = params['name'];
      this.isDirectMessage = params['isDirectMessage'] === 'true';
    });

    if (!this.isDirectMessage) {
      this.channelService.getChannel(this.channelId).subscribe(
        (response) => {
          console.log(response);
          this.channel = response.body;
          console.log(this.channel);
        },
        (error) => {
          console.error('Failed to get channel', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.initSocketConnection();
  }

  ngOnDestroy(): void {
    this.ioSubsription?.unsubscribe();
    this.socketService?.disconnect();
  }

  private initSocketConnection = () => {
    this.socketService.initSocket(this.channelId);
    this.ioSubsription = this.socketService
      .getMessages()
      .subscribe((messages: MessageResponse[]) => {
        this.messages = messages;
      });

    console.log(this.messages);
  };

  sendMessage = () => {
    this.socketService.sendMessage({ content: this.newMessage, image: null });
    this.newMessage = '';
  };

  sendImage = () => {
    if (!this.newImage) {
      return;
    }
    this.socketService.sendMessage({ content: null, image: this.newImage });
  };

  private toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  getProfilePic = async (id: string) => {
    return this.userService.getPhoto(id);
  };

  async onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.newImage = await this.toBase64(file);

      console.log('Selected file:', file);
    }
  }

  leaveChannel = () => {
    if (this.channel?.groupId) {
      this.router.navigate(['/channels'], {
        queryParams: { group: this.channel.groupId },
      });
    } else {
      this.router.navigate(['/users']);
    }
  };
}
