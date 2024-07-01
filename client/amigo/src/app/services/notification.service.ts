// notification.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _http:HttpClient) {}

  sendNotification(message: string, receiverId: string) {
    console.log('Sending notification:', message);
    this._http.post(`${environment.apiUrl}/notification/sendNotifiction`, { message, receiverId }).subscribe(
      (data) => {
        console.log('Notification sent successfully', data);
      },
      (error) => {
        console.error('Error sending notification', error);
      }
    )

  }
}
