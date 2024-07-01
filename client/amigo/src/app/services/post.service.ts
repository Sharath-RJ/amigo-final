import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpClient) {}

  addPost(
    caption: string,
    selectedFiles: File[] | null,
    userId: string | null
  ) {
    const formData = new FormData();
    formData.append('caption', caption);

    // Check if selectedFiles is defined and not null
    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
      }
    }

    formData.append('user', userId || '');

    return this._http.post<any>(`${environment.apiUrl}/post/addPost`, formData);
  }
}
