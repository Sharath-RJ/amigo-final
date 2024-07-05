import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrl: './posts-details.component.css',
})
export class PostsDetailsComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
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

  post: any;
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const id = params['id'];
      this._http.get(`${environment.apiUrl}/admin/viewPost/` + id).subscribe(
        (data) => {
          this.post = data;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
  publishPost(id: string) {
    this._http.patch(`${environment.apiUrl}/admin/publish/` + id, {}).subscribe(
      (data) => {
        this._snackBar.open('Published Successfully', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deletePost(id: string) {
    this._http.delete(`${environment.apiUrl}/post/delete/` + id, {}).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
