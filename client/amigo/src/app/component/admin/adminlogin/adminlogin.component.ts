import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css',
})
export class AdminloginComponent {
  email: string = '';
  password: string = '';

  constructor(private _authService: AuthServiceService,private _router: Router) {}

  login(): void {
    const isAuthenticated = this._authService.Adminlogin(this.email, this.password);
    if (isAuthenticated) {
      this._router.navigate(['/adminDashboard'])
    } else {
      // Show error message or handle authentication failure
    }
  }
}
