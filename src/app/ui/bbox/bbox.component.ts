import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/repositories/repositories.component';

@Component({
  selector: 'app-bbox',
  templateUrl: './bbox.component.html',
  styleUrls: ['./bbox.component.scss']
})
export class BboxComponent  {

  constructor(
    public dialogRef: MatDialogRef < BboxComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

}