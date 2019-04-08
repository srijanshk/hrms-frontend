import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormServices } from '../../../shared/services/form';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { PositionService } from '../../services/position.service';
import { first } from 'rxjs/operators';

export interface Status{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  public loading = false;
  public submitted = false;
  formErrors = {
    title : '',
    status: '',
    requiredExperience: '',
    noOfApplicants: '',
    applyingForPosition: '',
    startDate:'',
    endDate:'',
  };

  constructor(
    public form: FormBuilder,
    public formService: FormServices,
    public snackbar: MatSnackBar,
    private router: Router,
    public service: PositionService,
    private dialogRef:MatDialogRef<PositionComponent>
  ) { }

    statusList: Status[] = [
      {value: 'Open', viewValue:'Open'},
      {value: 'Close', viewValue:'Close'},
      {value: 'Not Decide', viewValue: 'Not Decide'}
    ];

  onSubmit() {
    this.submitted = true;
    this.formService.markFormGroupTouched(this.service.form);
    if (this.service.form.valid) {
      if(!this.service.form.get('id').value)
      {
      this.service.postPosition(this.service.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.snackbar.open('Position has been Added', 'Close', {
            duration: 3000,
          });
        },
        error => {
          this.loading = false;
          this.snackbar.open('Unsuccessful', 'Close', {
            duration: 3000,
          });
        },
      );
      }
      else{
        this.service.putPosition(this.service.form.get('id').value, this.service.form.value)
        .pipe(first())
        .subscribe(
          data => {
            this.snackbar.open('Position has been Updated', 'Close', {
              duration: 3000,
            });
          },
          error => {
            this.loading = false;
            this.snackbar.open('Unsuccessful', 'Close', {
              duration: 3000,
            });
          },
          
        );
      }
      this.closeDialog();
    } 
    else {
      this.formErrors = this.formService.validateForm(this.service.form, this.formErrors, false);
    }
    
  }

  closeDialog = function() {
    this.dialogRef.close();
  };

  clearForm = function() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  };

// initiate component
  ngOnInit() {
      }

}
