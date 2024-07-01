import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environment';
import { User } from '../../user-list/user-list.component';
import { MatDialog } from '@angular/material/dialog';
import { UserEditModalComponent } from '../../modal/user-edit-modal/user-edit-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'], // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class UsersListComponent implements OnInit {
  constructor(private _http: HttpClient, public dialog: MatDialog) {}
  p: number = 1;

  userList: User[] = [];
  totalUsers: any;

  ngOnInit(): void {
    console.log('hello');
    this._http
      .get<User[]>(`${environment.apiUrl}/admin/getAllUsers`)
      .subscribe(
        (data: User[]) => {
          console.log(data);
          this.userList = data;
          this.totalUsers = data.length;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  blockUser(id: any) {
    const index = this.userList.findIndex((user) => user._id === id);
    if (index !== -1) {
      this.userList[index].isBlocked = true; // Optimistic update
      this._http
        .put(`http://localhost:5000/api/admin/blockUser/${id}`, {})
        .subscribe(
          (data: any) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
            this.userList[index].isBlocked = false; // Revert change if error
          }
        );
    }
  }

  unblockUser(id: any) {
    const index = this.userList.findIndex((user) => user._id === id);
    if (index !== -1) {
      this.userList[index].isBlocked = false; // Optimistic update
      this._http
        .put(`http://localhost:5000/api/admin/unblockUser/${id}`, {})
        .subscribe(
          (data: any) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
            this.userList[index].isBlocked = true; // Revert change if error
          }
        );
    }
  }

  openEditDialog(user:any): void {
    console.log("user in modal",user);
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      width: '250px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // handle the result, e.g., update the user in the userList
        console.log(result);
        this.updateUser(result);
      }
    });
  }

  updateUser(updatedUser:any) {
    const index = this.userList.findIndex(
      (user) => user._id === updatedUser._id
    );
    if (index > -1) {
      this.userList[index] = updatedUser;
    }
    this._http.patch(`${environment.apiUrl}/admin/updateUser/${updatedUser._id}`, updatedUser).subscribe((data)=>{
       console.log(data)
    }, (err)=>{
      console.log(err)
    })
  }
}
