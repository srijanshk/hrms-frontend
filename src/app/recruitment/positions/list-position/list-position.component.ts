import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Router } from '@angular/router';
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position';
import { PositionComponent } from '../position/position.component';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-list-position',
  templateUrl: './list-position.component.html',
  styleUrls: ['./list-position.component.css']
})
export class ListPositionComponent implements OnInit {
  public role: String;
  public positionsource: any;
  public pageSize: number = 5;
  public pageIndex: number = 0;
  displayedColums: string[] = ['sn','title', 'status', 'requiredExperience','noOfApplicants','applyingForPosition','startDate','endDate','edit','delete'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: PositionService, 
    private dialog: MatDialog,
    private notificationService: NotificationService,
     ) { }

  ngOnInit() {
    this.getPosition();
  }
  
  getPosition() {
    this.service.getPositions()
    .subscribe((data: Position[]) => {
      this.positionsource = new MatTableDataSource(data);
      this.positionsource.paginator = this.paginator;
      this.positionsource.sort = this.sort;
    });
  }

  applyFilter(filterValue: String) {
    this.positionsource.filter = filterValue.trim().toLowerCase();

    if (this.positionsource.paginator) {
      this.positionsource.paginator.firstPage();
    }
  }

  onDelete(id: string){
    if(confirm('Please confirm, Do you want to delete ?')){
      this.service.deletePosition(id)
      .toPromise()
      .then(()=>{
        this.getPosition();
     });
    }
  }
  
  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PositionComponent,dialogConfig)
    .afterClosed().subscribe(() => {
        this.getPosition();
    });
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PositionComponent,dialogConfig)
    .afterClosed().subscribe(() => {
      this.getPosition();
  });
   
  }

 onPaginateChange(event){
   this.pageIndex = event.pageIndex;
   this.pageSize = event.pageSize;
}

// calculateNoOfDays(startDate,endDate){
//   return ((new Date(endDate)).getTime() - (new Date(startDate)).getTime())/(24*60*60*1000);
// }

}