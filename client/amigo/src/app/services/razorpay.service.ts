import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class RazorpayService {
  constructor(private http: HttpClient) {}

  PayForAppointment(amount: number) {
    return this.http.post(`${environment.apiUrl}/payment/PayForAppointmenteOrder`, { amount });
  }

  verifyPayment(paymentDetails: any) {
    return this.http.post(
      `${environment.apiUrl}/verifyPayment`,
      paymentDetails
    );
  }
}
