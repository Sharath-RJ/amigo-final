import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrl: './following.component.css',
})
export class FollowingComponent {
  constructor(public dialogRef: MatDialogRef<FollowingComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{following: any[]},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
