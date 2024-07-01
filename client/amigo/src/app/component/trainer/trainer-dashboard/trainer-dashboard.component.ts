  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { environment } from '../../../../../environment';
import { User } from '../../user-list/user-list.component';

interface ProfileData {
  fullName: string;
  bio: string;
  specialization: string;
  experience: number;
  qualifications: string;
  timeZone: string;
  hourlyRate: number;
  profilePic:string;
  MeetLink: string;
}


  @Component({
    selector: 'app-trainer-dashboard',
    templateUrl: './trainer-dashboard.component.html',
    styleUrl: './trainer-dashboard.component.css',
  })
  export class TrainerDashboardComponent implements OnInit {
    constructor(
      private _http: HttpClient,
  
    ) {}
    profileData: ProfileData = {
      profilePic: '',
      fullName: '',
      bio: '',
      specialization: '',
      experience: 0,
      qualifications: '',
      timeZone: '',
      hourlyRate: 0,
      MeetLink: '',
    };
    slots: any[] = [];
    p: number = 1;
    totalUsers: any;
    ngOnInit(): void {
      //getting all profile info
      this._http
        .get<ProfileData>(`${environment.apiUrl}/trainer/Dashboard`)
        .subscribe(
          (data) => {
            console.log(data);
            this.profileData = data;
          },
          (err) => {
            console.log(err);
          }
        );

      //getting all apppointments of the user
      this._http
        .get<any[]>(`${environment.apiUrl}/trainer/getAllAppointments`)
        .subscribe(
          (data) => {
            console.log('appointemnts', data);
            this.slots = data;
          },
          (err) => {
            console.log(err);
          }
        );
    }

    joinMeet() {
      const gMeetLink = this.profileData.MeetLink;
      window.open(gMeetLink, '_blank');
    }

   
  }
