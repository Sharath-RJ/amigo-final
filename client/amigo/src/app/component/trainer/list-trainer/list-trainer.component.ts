import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environment';
interface ProfileData {
  _id: string;
  fullName: string;
  bio: string;
  specialization: string;
  experience: number;
  qualifications: string;
  timeZone: string;
  hourlyRate: number;
  profilePic: string;
}
@Component({
  selector: 'app-list-trainer',
  templateUrl: './list-trainer.component.html',
  styleUrl: './list-trainer.component.css',
})
export class ListTrainerComponent implements OnInit {
  trainers: ProfileData[] = [];
  constructor(private _http: HttpClient) {}
  userFilter: any = { username: '' };

  ngOnInit(): void {
    this._http
      .get<ProfileData[]>(`${environment.apiUrl}/trainer/getAllTrainers`)
      .subscribe(
        (data) => {
          this.trainers = data;
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
