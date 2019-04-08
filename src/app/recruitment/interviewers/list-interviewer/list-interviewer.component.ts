import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Router } from '@angular/router';
import { InterviewerService } from '../../services/interviewer.service';
import { Interviewer } from '../../models/interviewer';
import { InterviewerComponent } from '../interviewer/interviewer.component';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-list-interviewer',
  templateUrl: './list-interviewer.component.html',
  styleUrls: ['./list-interviewer.component.css']
})
export class ListInterviewerComponent implements OnInit {
  public role: String;
  public interviewersource: any;
  public pageSize: number = 5;
  public pageIndex: number = 0;
  public url: '';
  displayedColums: string[] = ['sn','name', 'personalDetails', 'dueDate','edit','delete'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: InterviewerService, 
    private dialog: MatDialog,
    private notificationService: NotificationService
     ) { }

  ngOnInit() {
    this.getInterviewer();
  }
  
  getInterviewer() {
    this.service.getInterviewers()
    .subscribe((data: Interviewer[]) => {
      this.interviewersource = new MatTableDataSource(data);
      this.interviewersource.paginator = this.paginator;
      this.interviewersource.sort = this.sort;
    });
  }

  applyFilter(filterValue: String) {
    this.interviewersource.filter = filterValue.trim().toLowerCase();

    if (this.interviewersource.paginator) {
      this.interviewersource.paginator.firstPage();
    }
  }

  onDelete(id: number){
    if(confirm('Please confirm, Do you want to delete ?')){
      this.service.deleteInterviewer(id)
      .toPromise()
      .then(()=>{
        this.getInterviewer();
     });
    }
  }
  
  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(InterviewerComponent,dialogConfig)
    .afterClosed().subscribe(() => {
        this.getInterviewer();
    });
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(InterviewerComponent,dialogConfig)
    .afterClosed().subscribe(() => {
      this.getInterviewer();
  });
   
  }

 onPaginateChange(event){
   this.pageIndex = event.pageIndex;
   this.pageSize = event.pageSize;
}

}