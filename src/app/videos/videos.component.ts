import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PeerService } from '../services/peer.service';
import { SocketService } from '../services/socket.service';
import { MediaConnection } from 'peerjs';

interface VideoElement {
  muted: boolean;
  srcObject: MediaStream;
  userId: string;
}

const gdmOptions = {
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};

const gumOptions = {
  audio: true,
  video: {
    width: { ideal: 640 },
    height: { ideal: 360 },
  },
};

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent implements OnInit {
  isCallStarted = false;
  ownId: string;
  currentCall: MediaConnection | undefined;
  peerList: string[];
  currentStream: MediaStream | undefined;
  videos: VideoElement[] = [];
  calls: any = [];

  constructor(
    private socketService: SocketService,
    private peerService: PeerService,
    private cdr: ChangeDetectorRef
  ) {
    this.peerList = [];
    this.ownId = this.peerService.myPeerId;
  }

  ngOnInit(): void {
    this.socketService.initSocket();
    this.socketService.getPeerId().subscribe((peerId: any) => {
      if (peerId !== this.ownId) {
        this.peerList.push(peerId);
      }
    });
  }

  addMyVideo = (stream: MediaStream): void => {
    this.videos.push({
      muted: true,
      srcObject: stream,
      userId: this.peerService.myPeerId,
    });
  };

  addOtherUserVideo = (userId: string, stream: MediaStream): void => {
    let newVideo: VideoElement = {
      muted: false,
      srcObject: stream,
      userId,
    };
    let existing = false;
    this.videos.forEach((v, i, newVideos) => {
      if (v.userId === userId) {
        existing = true;
        newVideos[i] = newVideo;
      }
    });
    if (existing == false) {
      this.videos.push(newVideo);
    }
  };

  streamCamera = async (): Promise<void> => {
    this.currentStream = await navigator.mediaDevices.getUserMedia(gumOptions);
    this.addMyVideo(this.currentStream);
    if (this.peerService.myPeer.disconnected) {
      await this.peerService.myPeer.reconnect();
    }
    this.socketService.peerId(this.peerService.myPeerId);
    this.answering(this.currentStream);
    this.isCallStarted = true;
  };

  streamScreen = async (): Promise<void> => {
    this.currentStream = await navigator.mediaDevices.getDisplayMedia(
      gdmOptions
    );
    this.addMyVideo(this.currentStream);
    if (this.peerService.myPeer.disconnected) {
      await this.peerService.myPeer.reconnect();
    }

    this.socketService.peerId(this.peerService.myPeerId);

    this.answering(this.currentStream);
    this.isCallStarted = true;
  };

  calling = (peerId: string): void => {
    if (confirm(`Do you want to call ${peerId}?`)) {
      if (this.currentStream) {
        const call = this.peerService.myPeer.call(peerId, this.currentStream, {
          metadata: { peerId: this.ownId },
        });

        this.currentCall = call;
        this.calls.push(call);

        call.on('stream', (otherUserVideoStream: MediaStream) => {
          this.addOtherUserVideo(peerId, otherUserVideoStream);
        });

        call.on('close', () => {
          this.videos = this.videos.filter((v) => v.userId !== peerId);
          this.calls = this.calls.filter((c: any) => c !== call);
        });
      } else {
        console.error('No current stream available to make a call.');
      }
    }
  };

  answering = (stream: MediaStream): void => {
    this.peerService.myPeer.on('call', (call: any) => {
      call.answer(stream);
      call.on('stream', (otherUserVideoStream: MediaStream) => {
        this.addOtherUserVideo(call.metadata.peerId, otherUserVideoStream);
      });

      call.on('close', () => {
        this.videos = this.videos.filter(
          (v) => v.userId !== call.metadata.peerId
        );
        this.calls = this.calls.filter((c: any) => c !== call);
      });
    });
  };

  endCall = (): void => {
    console.log('end call');
    this.currentCall?.close();
    this.videos = [];
    this.calls = [];
    this.currentStream?.getTracks().forEach((track: any) => track.stop());
    this.currentStream = undefined;
    this.isCallStarted = false;
    this.cdr.detectChanges();
  };
}
