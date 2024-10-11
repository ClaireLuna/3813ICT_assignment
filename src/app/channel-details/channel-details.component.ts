import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageResponse, SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

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
  newMessage: string = 'test';
  newImage: string = '';
  currentUserId: string = '';

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private authService: AuthService
  ) {
    this.currentUserId = this.authService.user?.id || '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.channelId = params['channel'];
    });
    this.initSocketConnection();
  }

  ngOnDestroy(): void {
    this.ioSubsription.unsubscribe();
    this.socketService.disconnect();
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

  toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  async onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.newImage = await this.toBase64(file);

      console.log('Selected file:', file);
    }
  }
}
