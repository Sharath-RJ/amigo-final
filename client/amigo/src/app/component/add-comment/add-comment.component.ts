import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environment';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css',
})
export class AddCommentComponent {
  @Input() postId: string | undefined;
  @Output() commentsAdded = new EventEmitter<any>();
  comment: string = '';
  constructor(private _http: HttpClient) {}
 
  addingComment() {
    console.log("adding comment")
    const loggedInUserId = sessionStorage.getItem('loginedInUser');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
   
    this._http
      .put(
        `${environment.apiUrl}/post/commentPost/` + this.postId,
        {
          comment: this.comment,
        },
        { headers }
      )
      .subscribe(
        (data) => {
        this.comment = ' ';
        this.commentsAdded.emit(data);
        //notify commentation
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
