import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Peer } from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  myPeerId = uuidv4();
  myPeer: any;
  streamCamera: any;
  streamScreen: any;

  constructor() {
    this.myPeer = new Peer(this.myPeerId, {
      host: 's5038261.elf.ict.griffith.edu.au',
      secure: true,
      port: 3001,
      path: '/',
    });
  }
}
