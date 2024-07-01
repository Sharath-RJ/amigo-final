import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from '../../../../environment';
declare var google:any

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
})
export class LoginComponentComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  email!: String;
  password!: String;
  login() {
    this.http
      .post<{user:any,token:any}>(`${environment.apiUrl}/user-auth/login`, {
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (data) => {
          if ('user' in data) {
            console.log(data.user);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('loginedInUser', JSON.stringify(data.user));
            if(data.user.role == "Trainer" && !data.user.profileComplete){this.router.navigate(['/TrainerProfileComplete']);}
            else if (data.user.role == 'Trainer' && data.user.profileComplete) this.router.navigate(['/TrainerDashboard']);
            else this.router.navigate(['/home']);
          } else {
            console.log('User property not found in data');
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
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
    const payload = this.decodetoken(response.credential);
    sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
    this.router.navigate(['/home']);
  }
  private decodetoken(token: String) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
