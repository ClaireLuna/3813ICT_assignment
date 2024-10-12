import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Peer } from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  myPeerId = uuidv4();
  myPeer: Peer;
  streamCamera: any;
  streamScreen: any;

  constructor() {
    this.myPeer = new Peer(this.myPeerId, {
      host: 'localhost',
      secure: true,
      port: 3001,
      path: '/',
    });
  }
}
