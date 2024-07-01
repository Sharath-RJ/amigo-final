import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';


export interface User {
  _id: number;
  name: string;
  email: string;
  profilePic: string;
  username: string;
  isFollowing:any;
  isBlocked:boolean
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userid!: string;
  searchText!: string;
  userFilter: any = { username: '' };
  p:number=1

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const loggedInUser = sessionStorage.getItem('loginedInUser');
    if (loggedInUser) {
      this.userid = JSON.parse(loggedInUser)._id;
    }
    console.log(this.userid);
    this.fetchUsers(this.userid);
  }

  fetchUsers(userid: string): void {
    this.http
      .get<User[]>(`${environment.apiUrl}/user/getAllUsers/${userid}`)
      .subscribe(
        (data: User[]) => {
          this.users = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }
}
