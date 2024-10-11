import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageResponse, SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {}

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

  sendImage = (image: string) => {
    this.socketService.sendMessage({ content: null, image: image });
  };
}
