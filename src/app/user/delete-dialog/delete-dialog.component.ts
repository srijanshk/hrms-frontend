import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  public _id: String;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  

  ngOnInit() {
  }

  onYesClick() {
    this.dialogRef.close();
  }

}
