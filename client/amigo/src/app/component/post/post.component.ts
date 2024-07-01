import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  activeCommentPostId: string | null = null;
  activeLikePostId: string | null = null;
  showcomments: boolean = false;
  showLikes: boolean = false;
  postLiked: { [key: string]: boolean } = {};
  userId!: string;
  @Output() showAllCommentsEvent = new EventEmitter<string>();
  @Output() showAllLikesEvent = new EventEmitter<string>();

  constructor(private _http: HttpClient, private notification:NotificationService) {}
  posts: any = [];
  loggedInUser: string | null = sessionStorage.getItem('loggedInUser');

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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
    nav: true,
  };

  ngOnInit(): void {
    console.log('Hello post');
    const loggedInUserId = sessionStorage.getItem('loginedInUser');
    if (loggedInUserId) {
      this.userId = JSON.parse(loggedInUserId)._id;
    }
    this._http.get(`${environment.apiUrl}/post/getAllPosts`).subscribe(
      (data) => {
        this.posts = data;
        // Initialize the postLiked object
        console.log(this.posts);
        this.posts.forEach((post: any) => {
          this.postLiked[post._id] = post.likes.includes(this.userId);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showAddComment(postId: string) {
    if (this.activeCommentPostId === postId) {
      this.activeCommentPostId = null; // Toggle off if clicked again
    } else {
      this.activeCommentPostId = postId;
      this.activeLikePostId = null; // Deactivate likes when comments are activated
    }
  }

  likePost(postId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });

    this._http
      .put(`${environment.apiUrl}/post/likePost/${postId}`, {}, { headers })
      .subscribe(
        (data) => {
          const post = this.posts.find((post: any) => post._id === postId);
          if (post) {
            post.likes.push(this.userId); // Update the likes array
            this.postLiked[postId] = true; // Update the like status
            this.notification.sendNotification("Your post has been liked",post.user);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  unlikePost(postId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });

    this._http
      .put(
        `${environment.apiUrl}/post/unlikePost/${postId}`,
        {},
        { headers }
      )
      .subscribe(
        (data) => {
          const post = this.posts.find((post: any) => post._id === postId);
          if (post) {
            post.likes = post.likes.filter(
              (userId: any) => userId !== this.userId
            ); // Update the likes array
            this.postLiked[postId] = false; // Update the like status
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleCommentsAdded(comment: any) {
    this.activeCommentPostId = ' ';

    const postIndex = this.posts.findIndex(
      (post: any) => post._id === comment._id
    );
    if (postIndex !== -1) {
      const updatedPosts = [...this.posts];
      updatedPosts[postIndex].comments.push(this.userId);
      this.posts = updatedPosts;
      this.notification.sendNotification("Your post has a new comment", this.posts[postIndex].user);
    }
  }

  showAllComments(postId: string) {
    if (this.activeCommentPostId === postId) {
      this.activeCommentPostId = null; // Toggle off if clicked again
    } else {
      this.activeCommentPostId = postId;
      this.activeLikePostId = null; // Deactivate likes when comments are activated
    }
    this.showAllCommentsEvent.emit(postId);
  }

  showAllLikes(postId: string) {
    if (this.activeLikePostId === postId) {
      this.activeLikePostId = null; // Toggle off if clicked again
    } else {
      this.activeLikePostId = postId;
      this.activeCommentPostId = null; // Deactivate comments when likes are activated
    }
    this.showAllLikesEvent.emit(postId);
  }
}

