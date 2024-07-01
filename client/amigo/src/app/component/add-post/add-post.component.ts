import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../services/post.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  caption: string = '';
  selectedFiles: File[] | null = null;
  loggedInUser: any;
  imageUrl: string | undefined;
  previewUrls: string[] = [];

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private postService: PostService,
    private _router: Router
  ) {
    const loggedInUserString = sessionStorage.getItem('loginedInUser');
    this.loggedInUser = loggedInUserString
      ? JSON.parse(loggedInUserString)
      : null;
  }

  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.previewUrls = [];

    if (this.selectedFiles) {
      this.selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onSubmit() {
    const userId = this.loggedInUser ? this.loggedInUser._id : null;
    console.log('caption', this.caption);
    console.log('logged in user', userId);
    console.log('selected files', this.selectedFiles);

    if (this.caption && this.selectedFiles && userId) {
      this.postService
        .addPost(this.caption, this.selectedFiles, userId)
        .subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open(
              'Your Post Uploaded. Wait for admin to review your Post.',
              '',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
            this._router.navigate(['/home']);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log('Missing required arguments.');
    }
  }
}
