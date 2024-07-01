import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.css',
})
export class FollowersComponent {
  constructor(
    public dialogRef: MatDialogRef<FollowersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { followers: any[] }
  ) { console.log(this.data); }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
