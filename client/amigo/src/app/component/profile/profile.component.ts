  import { HttpClient } from '@angular/common/http';
  import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
  import { environment } from '../../../../environment';
  import { OwlOptions } from 'ngx-owl-carousel-o';
  import { MatDialog } from '@angular/material/dialog';
  import { EditPostModalComponent } from '../edit-post-modal/edit-post-modal.component';
import { FollowersComponent } from '../modal/followers/followers.component';
import { ConfirmDialogComponent } from '../modal/confirm-dialog/confirm-dialog.component';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
  })
  export class ProfileComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef;
    userid!: string;
    username!: string;
    following: any;
    followers: any;
    posts: Post[] = [];
    profilePic: string = '';
    p:number=1;
    totalUsers:any

    constructor(private _http: HttpClient, public dialog: MatDialog) {}

    onProfilePicClick() {
      this.fileInput.nativeElement.click();
    }
    openFollowersModal() {
      this.dialog.open(FollowersComponent, {
        width: '500px',
        data: {
          followers: this.followers,
        },
      });
    }

    openFollowingModal(){
      console.log(this.following)
      this.dialog.open(FollowersComponent, {
        width: '500px',
        data: {
          followers: this.following,
        },
      });
    }

    onFileSelected(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target && target.files && target.files.length > 0) {
        const file = target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Amigo-Project'); // Ensure this preset is correctly set in Cloudinary

        this._http
          .post<{ secure_url: string }>(
            'https://api.cloudinary.com/v1_1/djbvjenjy/image/upload',
            formData
          )
          .subscribe(
            (response: any) => {
              console.log(response.url);
              this._http
                .put<{ profilePic: string }>(
                  `${environment.apiUrl}/user/updateProfilePic/${this.userid}`,
                  { profilePic: response.url }
                )
                .subscribe((data) => {
                  console.log(data);
                  this.profilePic = data.profilePic;
                });
            },
            (error: any) => {
              console.error('Upload error:', error);
            }
          );
      }
    }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
        },
        740: {
          items: 1,
        },
        940: {
          items: 1,
        },
      },
      nav: false,
    };

    ngOnInit(): void {
      console.log('hello');
      const loggedInUser = sessionStorage.getItem('loginedInUser');
      console.log(loggedInUser);
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        this.userid = user._id;
        this.username = user.username;
        // this.followers = user.followers;
        // this.following = user.following;
        this.profilePic = user.profilePic;
        console.log(this.followers, this.following, this.userid, this.username);
      }

      //Getting the details  of logged in user
      this._http
        .get(
          `${environment.apiUrl}/user/getLoggedInUserDetails`
        )
        .subscribe((data:any) => {
          console.log("user profile detailsddddddddddddddddddddddddddddddddddddddddd",data);
          this.followers = data.followers;
          this.following = data.following;
        
        });

      // Getting all the posts by this user
      this._http
        .get<Post[]>(
          `${environment.apiUrl}/post/getAllPostsofUser/${this.userid}`
        )
        .subscribe(
          (data: Post[]) => {
            this.posts = data;
          },
          (error) => {
            console.log(error);
          }
        );
    }

    openEditModal(post: any): void {
      const dialogRef = this.dialog.open(EditPostModalComponent, {
        width: '400px',
        data: post,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Handle the updated post data
          const index = this.posts.findIndex((p) => p === post);
          if (index > -1) {
            this.posts[index] = { ...post, ...result };
          }
        }
      });
    }

    deletePost(post: any) {
       const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         width: '250px',
         data: {
           title: 'Confirm Action',
           message: 'Are you sure you want to delete this post?',
         },
       })

         dialogRef.afterClosed().subscribe((result) => {
           if (result) {
              this._http
                .delete(`${environment.apiUrl}/post/deletePost/${post._id}`)
                .subscribe(
                  (data) => {
                    console.log(data);
                    this.posts = this.posts.filter(
                      (existingPost) => existingPost._id !== post._id
                    );
                  },
                  (error) => {
                    console.log(error);
                  }
                );
           } else {
             console.log('User cancelled action');
           }
         });
     
    }
  }

interface Post {
  _id: any;
  id: string;
  caption: string;
  image: [];
  
}
