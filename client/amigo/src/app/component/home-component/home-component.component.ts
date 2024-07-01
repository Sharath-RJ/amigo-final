import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent {
  constructor(private authservice: AuthServiceService) {}
  name: string = '';
  picture: string = '';

  ngOnInit() {
    const loggedInUser = sessionStorage.getItem('loginedInUser');
    if (loggedInUser) this.name = JSON.parse(loggedInUser).username
    
    console.log(loggedInUser)
    const ProfilePic = sessionStorage.getItem('loginedInUser');
    console.log("ProfilePic",ProfilePic)
    if (ProfilePic) this.picture = JSON.parse(ProfilePic).profilePic;
  }

  signOut() {
    this.authservice.signOut();
  }
}
