import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  constructor(private _http: HttpClient) {}
  posts: any[] = [];
  p: number = 1;
  ngOnInit(): void {
    console.log('hello');
    this._http.get(`${environment.apiUrl}/admin/getPosts`).subscribe(
      (data) => {
        this.posts = data as any[];
        console.log(this.posts)
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
}
