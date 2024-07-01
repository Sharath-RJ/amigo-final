// edit-post-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { ContentObserver } from '@angular/cdk/observers';
import { ConfirmDialogComponent } from '../modal/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css'],
})
export class EditPostModalComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _http: HttpClient,
    public dialog: MatDialog

  ) {
    this.editForm = this.fb.group({
      caption: [data.caption],
      image: [null],
    });
    console.log(data.image);
  }
  ngOnInit() {
    console.log(this.data.image); // Access data after it's available
  }
  trackByImageId(index: number, image: any): string | undefined {
    return image._id; // Assuming image object has an id property
  }

  extractImageId(fileName: string): string {
    // Assuming the ID is the part before the first hyphen (-)
    // const parts = fileName.split('-');
    // return parts[0];
    return fileName;
  }

  deleteImage(imageId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirm Action',
        message: 'Are you sure you want to delete this image?',
      },
    });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            
      this._http
        .delete(
          `${environment.apiUrl}/post/deletePostImage/${this.data._id}/${imageId}`
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.data.image = this.data.image.filter(
              (image: any) => image !== imageId
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.editForm.patchValue({ image: file });
  }

  onSave() {
    alert(this.editForm.value.caption);
    this._http
      .put(`${environment.apiUrl}/post/updatePost/${this.data._id}`, {
        caption: this.editForm.value.caption,
      })
      .subscribe(
        (data) => {
          this.dialogRef.close();
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
