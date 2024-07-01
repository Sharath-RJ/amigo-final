import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent {
  otp: string[] = ['', '', '', ''];
  phoneNumber = '';

  constructor(private _http: HttpClient, private _router: Router) {
    this.phoneNumber = history.state.phoneNumber;
  }

  // Setter method for otpString
  set otpString(value: string) {
    // Assign the value of otpString
    this._otpString = value;
    console.log('OTP String:', this._otpString);
  }

  get otpString(): string {
    return this._otpString;
  }

  private _otpString: string = '';

  submitOtp() {
    // Join the otp array to get otpString
    this.otpString = this.otp.join('');

    console.log('hello');
    console.log(this.otpString);
    this._http
      .post(`${environment.apiUrl}/user-auth/verify-otp`, {
        phoneNumber: this.phoneNumber,
        otp: this.otpString,
      })
      .subscribe(
        (data) => {
           this._router.navigate(['/']);
          console.log(data);
          console.log('Successfully Verified');
        },
        (error) => {
          console.error('OTP verification error', error);
        }
      );
  }
}

