import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/repositories/repositories.component';

@Component({
  selector: 'app-tinterval',
  templateUrl: './tinterval.component.html',
  styleUrls: ['./tinterval.component.scss']
})
export class TintervalComponent {

  constructor(
    public dialogRef: MatDialogRef < TintervalComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

}
