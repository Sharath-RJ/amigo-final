import { Injectable, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ADMIN_CREDENTIALS } from '../services/constants';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private router: Router, private _http:HttpClient) {}
  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['login']);
  }
  Adminlogin(email: string, password: string): boolean {
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      return true;
    } else {
      return false;
    }
  }
  login(email:string,password:string) {
    this._http
      .post(`${environment.apiUrl}/user-auth/login`, {
        email: email,
        password:password,
      })
      .subscribe(
        (data) => {
          if ('user' in data) {
            console.log(data.user);
            sessionStorage.setItem('loginedInUser', JSON.stringify(data.user));
            this.router.navigate(['/home']);
          } else {
            console.log('User property not found in data');
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
