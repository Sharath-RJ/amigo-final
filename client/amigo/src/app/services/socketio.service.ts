// src/app/services/socket.service.ts

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:5000"); 
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });
    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });
  }

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
    console.log('Joining room:', room);
  }

  sendMessage(message: any): void {
    this.socket.emit('sendMessage', message);
    console.log('Sending message:', message);
  }

  onNewMessage(callback: (message: any) => void): void {
    this.socket.on('newMessage', callback);
    
  }
    

  disconnect(): void {
    this.socket.disconnect();
    console.log('Socket disconnected manually');
  }
}
