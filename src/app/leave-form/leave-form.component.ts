import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from '../services/form';
import { LeaveFormService } from '../services/leaveFormModel.services';
import { MatSnackBar, MatRadioButton } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { first, filter } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { LeaveForm } from '../models/leaveFormModel';
import { Observable } from 'rxjs';

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


  SingleDay: MatRadioButton;
  MultipleDays: MatRadioButton;

  minDate = new Date();
  maxDate = new Date();
  mulDate = new Date();

  public show: boolean = false;
  leaveformsource: any;
  displayedColumns = ['leaveType', 'start_date', 'end_date', 'selectTypeOfDays', 'noOfDays', 'leaveReason'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  leaves: Leave[] = [
    { value: 'Paid', viewValue: 'Paid' },
    { value: 'Unpaid', viewValue: 'Unpaid' },
    { value: 'Substitute', viewValue: 'Substitute' },
    { value: 'Paternity', viewValue: 'Paternity' },
    { value: 'Maternity', viewValue: 'Maternity' },
    { value: 'Bereavement', viewValue: 'Bereavement' },
    { value: 'Reward', viewValue: 'Reward' },
    { value: 'Floating', viewValue: 'Floating' }
  ];

  public myFilter1;
  public myFilter2;
  public leaveForm: FormGroup;
  public leaveType: FormControl;
  public start_date: FormControl;
  public end_date: FormControl;
  public selectTypeOfDays: FormControl;
  public noOfDays: FormControl;
  public leaveReason: FormControl;
  public loading = false;
  public submitted = false;

  formErrors = {
    leaveType: '',
    leaveReason: ''
  };

  public buildLeaveForm() {
    this.leaveForm = this.form.group({
      leaveType: this.leaveType = new FormControl(),
      start_date: this.start_date = new FormControl(new Date().toISOString()),
      end_date: this.end_date = new FormControl(new Date().toISOString()),
      selectTypeOfDays: this.selectTypeOfDays = new FormControl(),
      noOfDays: this.noOfDays = new FormControl(this.BusinessDates),
      leaveReason: this.leaveReason = new FormControl('', [Validators.required])
    });

    this.leaveForm.valueChanges.subscribe(data => {
      this.formErrors = this.formService.validateForm(this.leaveForm, this.formErrors, true);
    });
  }


  public toggle() {
    this.show = true;
  }


  public focusOnSingleDay() {
    this.myFilter1 = (d: Date): boolean => {
      const day = d.getDay();
      return day !== 0 && day !== 6;
    };
    this.myFilter2 = (d: Date): boolean => {
      this.minDate = new Date(this.start_date.value);
      this.maxDate = new Date(this.start_date.value);
      const day = d.getDay();
      return day !== 0 && day !== 6;
    };
  }

  public focusOnMultipleDays() {
    this.myFilter1 = (d: Date): boolean => {
      const day = d.getDay();
      return day !== 0 && day !== 6;
    };
    this.myFilter2 = (d: Date): boolean => {
      this.mulDate = new Date(this.start_date.value);
      const dateInms = this.mulDate.getTime();
      const plusonedateInms = dateInms + (1000 * 60 * 60 * 24);
      this.minDate = new Date(this.minDate.setTime(plusonedateInms));
      this.maxDate = new Date(2222, 0, 1);
      const day = d.getDay();
      return day !== 0 && day !== 6;
    };
  }

  public BusinessDates = function(date1, date2) {
    const one_day = 1000 * 60 * 60 * 24;
    date1 = new Date(this.start_date.value);
    const date1_day = date1.getDay(); // when user selects a single day
    date2 = new Date(this.end_date.value);
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();
    const current_date = new Date(this.start_date.value);
    const last_date = new Date(this.end_date.value);
    var count = 0;
    const difference_ms = date2_ms - date1_ms + 1000 * 60 * 60 * 24;
    for (var i = current_date; i < last_date; ) {
      if (i.getDay() === 0 || i.getDay() === 6) {
        count++;
      }
      i.setTime(i.getTime() + 1000 * 60 * 60 * 24);
    }
    if (date1_day === 0 || date1_day === 6) {
      const number = 0;
      return number;
    }
    const value = Math.ceil(difference_ms / one_day) - count;
    return value;
  };

  public applyFilter(filterValue: string) {
    this.leaveformsource.filter = filterValue.trim().toLowerCase();

    if (this.leaveformsource.paginator) {
      this.leaveformsource.paginator.firstPage();
    }
  }

// Error Messages

  public getleaveTypeErrorMessage() {
    return this.leaveType.hasError('required') ? 'Enter a valid leave type' : '';
  }

  public getleaveReasonErrorMessage() {
    return this.leaveReason.hasError('required')
      ? 'You must enter a reason'
      : '';
  }

  // public getvalidstartdate() {
  //   return this.start_date.hasError('required') ? 'Enter a valid start date' : '';
  // }

  constructor(
    public form: FormBuilder,
    public formService: FormService,
    public snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private leaveformservice: LeaveFormService
  ) {}

  public ngOnInit() {
    this.buildLeaveForm();
    this.getleaveinfo();
  }

  public leavesubmit() {
    this.submitted = true;
    this.formService.markFormGroupTouched(this.leaveForm);
    if (this.leaveForm.valid) {
      console.log(this.leaveForm.value);
      this.leaveformservice
        .registerLeaveForm(this.leaveForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.snackbar.open(
              'Succesfully submitted a valid form. yay!',
              'Close',
              {
                duration: 3000
              }
            );
          },
          error => {
            this.loading = false;
            this.snackbar.open(
              'Unsuccessful posting leave appplication',
              'Close',
              {
                duration: 3000
              }
            );
          }
        );
    } else {
      this.formErrors = this.formService.validateForm(
        this.leaveForm,
        this.formErrors,
        false
      );
    }
  }

  public getleaveinfo() {
     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
     const current_user = currentUser.user._id;
     this.leaveformservice.getLeaveFormbyUser(current_user).subscribe((data: LeaveForm[]) => {
     this.leaveformsource = new MatTableDataSource(data);
    this.leaveformsource.paginator = this.paginator;
      });
  }
}

