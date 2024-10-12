import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PeerService } from '../services/peer.service';
import { SocketService } from '../services/socket.service';

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
  currentCall: any;
  peerList: string[];
  currentStream: any;
  videos: VideoElement[] = [];
  calls: any = [];

  constructor(
    private socketService: SocketService,
    private peerService: PeerService
  ) {
    this.peerList = [];
    this.ownId = this.peerService.myPeerId;
  }

  ngOnInit(): void {
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
    this.currentCall.close();
    this.videos = this.videos.filter(
      (v) => v.userId !== this.peerService.myPeerId
    );
    this.calls = this.calls.filter((c: any) => c !== this.currentCall);
    this.currentStream.getTracks().forEach((track: any) => track.stop());
    this.isCallStarted = false;
  };
}
