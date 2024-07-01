import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environment';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent implements OnInit {
  username!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  phoneNumber!: string;
  role!:string;

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '803863524285-ogjv1ng34vv97mk60gmfkco5fs0jhr4a.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleLLogin(response);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_black',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }

  handleLLogin(response: any) {
    const payload = this.decodeToken(response.credential);
    sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
    this._router.navigate(['/home']);
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validateUsername(username: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    return usernamePattern.test(username);
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const phonePattern = /^[789]\d{9}$/;
    return phonePattern.test(phoneNumber);
  }

  register() {
    if (!this.validateUsername(this.username)) {
      this._snackBar.open(
        'Invalid username. Only alphanumeric characters are allowed.',
        'Close',
        {
          duration: 3000,
          panelClass: ['snackbar-error'],
        }
      );
      return;
    }

    if (!this.validateEmail(this.email)) {
      this._snackBar.open('Invalid email format.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    if (!this.validatePhoneNumber(this.phoneNumber)) {
      this._snackBar.open(
        'Invalid phone number. It should start with 7, 8, or 9 and be 10 digits long.',
        'Close',
        {
          duration: 3000,
          panelClass: ['snackbar-error'],
        }
      );
      return;
    }

    if (this.password !== this.confirmPassword) {
      this._snackBar.open('Passwords do not match.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    if (!this.username || !this.email || !this.password || !this.phoneNumber) {
      this._snackBar.open('Please fill all the required fields.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    this._http
      .post(`${environment.apiUrl}/user-auth/send-otp`, {
        username: this.username,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        role: this.role
      })
      .subscribe(
        (data) => {
          this._router.navigate(['/otpVerify'], {
            state: { phoneNumber: this.phoneNumber },
          });
          this._snackBar.open('Registration successful, OTP sent!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
        },
        (error) => {
          console.error('Registration error', error);
          this._snackBar.open(
            'Registration failed. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
        }
      );
  }
}
