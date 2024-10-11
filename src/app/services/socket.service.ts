import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';
import { apiUrl } from '../../constants';
import { Observable } from 'rxjs';

type MessageBase = {
  content: string | null | undefined;
  image: string | null | undefined;
};
type SocketUser = { id: string; username: string };
export type MessageResponse = { user: SocketUser } & MessageBase;

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private messages: MessageResponse[] = [];

  constructor(private authService: AuthService) {}

  initSocket = (channelId: string) => {
    this.socket = io(apiUrl, {
      auth: { token: this.authService.user?.apiToken, channelId: channelId },
    });
    this.socket.connect();
    console.log(this.socket);
    console.log('connected');
  };

  disconnect = () => {
    this.socket.disconnect();
  };

  getMessages = (): Observable<MessageResponse[]> => {
    return new Observable((observer) => {
      this.socket.on('allMessages', (messages: MessageResponse[]) => {
        this.messages = messages;
        observer.next(this.messages);
      });
      this.socket.on('newMessage', (message: MessageResponse) => {
        this.messages.push(message);
        observer.next(this.messages);
      });
    });
  };

  sendMessage = (message: MessageBase) => {
    this.socket.emit('sendMessage', message);
  };
}
