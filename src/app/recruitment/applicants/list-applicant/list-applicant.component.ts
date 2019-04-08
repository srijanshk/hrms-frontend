import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Router } from '@angular/router';
import { ApplicantService } from '../../services/applicant.service';
import { Applicant } from '../../models/applicant';
import { ApplicantComponent } from '../applicant/applicant.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { PositionService } from '../../services/position.service';


@Component({
  selector: 'app-list-applicant',
  templateUrl: './list-applicant.component.html',
  styleUrls: ['./list-applicant.component.css']
})
export class ListApplicantComponent implements OnInit {
  public role: String;
  public applicantsource: any;
  public pageSize: number = 5;
  public pageIndex: number = 0;
  displayedColums: string[] = ['sn','name', 'applyingFor','description', 'stage','resume','email','phone','appliedDate','remarks','edit','delete'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: ApplicantService, 
    private dialog: MatDialog,
    private notificationService: NotificationService,
    public servicePosition: PositionService,
     ) { }

  ngOnInit() {
    this.getApplicant();
  }
  
  // getPositionValue(id: string)
  // {
  //    this.servicePosition.getPositionById(id)
  //    .subscribe(val => {
  //      return val['name'];
  //    } );
  // }

  getApplicant() {
    this.service.getApplicants()
    .subscribe((data: Applicant[]) => {
      this.applicantsource = new MatTableDataSource(data);
      this.applicantsource.paginator = this.paginator;
      this.applicantsource.sort = this.sort;
    });
  }

  applyFilter(filterValue: String) {
    this.applicantsource.filter = filterValue.trim().toLowerCase();

    if (this.applicantsource.paginator) {
      this.applicantsource.paginator.firstPage();
    }
  }

  onDelete(id: number){
    if(confirm('Please confirm, Do you want to delete ?')){
      this.service.deleteApplicant(id)
      .toPromise()
      .then(()=>{
        this.getApplicant();
     });
    }
  }
  
  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ApplicantComponent,dialogConfig)
    .afterClosed().subscribe(() => {
        this.getApplicant();
    });
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ApplicantComponent,dialogConfig)
    .afterClosed().subscribe(() => {
      this.getApplicant();
  });
   
  }

 onPaginateChange(event){
   this.pageIndex = event.pageIndex;
   this.pageSize = event.pageSize;
}

}