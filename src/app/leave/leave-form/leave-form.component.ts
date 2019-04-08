import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatPaginator, MatRadioButton } from '@angular/material';
import { FormGroup, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { FormServices } from 'src/app/shared/services/form';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LeaveApiService } from '../services/leave-api.service';



export interface Leave {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})

export class LeaveFormComponent implements OnInit {

  constructor(
    public formService: FormServices,
    public form: FormBuilder,
    public snackbar: MatSnackBar,
    private router: Router,
    private leaveApi: LeaveApiService,
    public dialogRef: MatDialogRef<LeaveFormComponent>
  ) { }

  minDate = new Date();
  maxDate = new Date();


  public leaveForm: FormGroup;
  public selectTypeofDays: FormControlName;
  public start_date: FormControl;
  public end_date: FormControl;
  public noOfDays: FormControl;
  public checked: boolean;
  public leaveDays: Number;

  public submitted = false;
  public displayedColumns = ['sn', 'leaveType', 'description', 'leaveFrom', 'leaveTo', 'appliedOn', 'leaveStatus'];

  formErrors = {
    leave_type: '',
    description: '',
    start_date: '',
    end_date: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  leaves: Leave[] = [
    { value: 'Paid', viewValue: 'Paid' },
    { value: 'Unpaid', viewValue: 'Unpaid' },
    { value: 'Substitute', viewValue: 'Substitute' },
    { value: 'Paternity', viewValue: 'Paternity' },
    { value: 'Maternity', viewValue: 'Maternity' },
    { value: 'Bereavement', viewValue: 'Bereavement' },
    { value: 'Floating', viewValue: 'Floating' },
    { value: 'Reward', viewValue: 'Reward' }
  ];

  public myFilter1 = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  public myFilter2 = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  calculateNoOfDays(date1, date2) {
    // console.log('called method');
    const one_day = 1000 * 60 * 60 * 24;
    date1 = new Date(this.start_date.value);
    const date1_day = date1.getDay();
    date2 = new Date(this.end_date.value);
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();
    const current_date = new Date(this.start_date.value);
    //  console.log('current day',current_date);
    const last_date = new Date(this.end_date.value);
    //  console.log('last day',last_date);
    var count = 0;
    const difference_ms = date2_ms - date1_ms + 1000 * 60 * 60 * 24;
    //  console.log('difference in ms',difference_ms);
    for (var i = current_date; i < last_date;) {
      if (i.getDay() === 0 || i.getDay() === 6) {
        count++;
      }
      i.setTime(i.getTime() + 1000 * 60 * 60 * 24);
    }
    if (date1_day === 0 || date1_day === 6) {
      const number = 0;
      return number;
    }
    this.leaveDays = Math.ceil(difference_ms / one_day) - count;
    return this.leaveDays;
  };

  checkboxValue(e) {
    this.checked = e.checked;
  }

  onSubmit() {
    this.submitted = true;
    this.formService.markFormGroupTouched(this.leaveForm);
    if (this.leaveForm.valid) {
      const userEmail = JSON.parse(localStorage.getItem('currentUser')).user.email;
      this.leaveForm.value.email = userEmail;
      console.log('this.leaveDays', this.leaveDays);
      this.leaveForm.value.noOfDays = this.leaveDays;
      this.leaveApi.createLeave(this.leaveForm.value)
        .pipe(first())
        .subscribe(
          data => {
            
            this.snackbar.open(
              'Leave has been requested successfully', 'Close', {
                duration: 3000,
              });
            this.onNoClick();

          },
          error => {
            // this.loading = false;
            this.snackbar.open('Unsuccessful', 'Close', {
              duration: 3000,
            });
          }
        );
    } else {
      this.formErrors = this.formService.validateForm(this.leaveForm, this.formErrors, false);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.checked = false;
    this.leaveInfo();
  }

  leaveInfo() {
    this.leaveForm = this.form.group({
      leave_type: [''],
      start_date: this.start_date = new FormControl(new Date().toISOString()),
      end_date: this.end_date = new FormControl(new Date().toISOString()),
      noOfDays: this.noOfDays = new FormControl(),
      description: [''],
    });
  }

}

