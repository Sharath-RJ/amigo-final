import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchText!: string;
  @Input() user!: {
    isFollowing: any;
    _id: any | string;
    profilePicture: string;
    username: string;
  };
}
