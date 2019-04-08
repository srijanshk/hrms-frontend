import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormServices } from '../../../shared/services/form';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ApplicantService } from '../../services/applicant.service';
import { PositionService } from '../../services/position.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  public loading = false;
  public submitted = false;
  positionList: any;
  formErrors = {
    name : '',
    applyingFor: '',
    description: '',
    stage: '',
    resume: '',
    email: '',
    phone: '',
    appliedDate: '',
    remarks: ''
  };

  constructor(
    public form: FormBuilder,
    public formService: FormServices,
    public snackbar: MatSnackBar,
    private router: Router,
    public service: ApplicantService,
    private dialogRef:MatDialogRef<ApplicantComponent>,
    public serviceApplicant: PositionService,
  ) {
    this.getPositionList();
   }

   getPositionList(){
  this.serviceApplicant.getPositions().subscribe(data => {
    this.positionList= data; });
  }
 
  onSubmit() {
    this.submitted = true;
    this.formService.markFormGroupTouched(this.service.form);
    if (this.service.form.valid) {
      if(!this.service.form.get('id').value)
      {
      this.service.postApplicant(this.service.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.snackbar.open('Applicant has been Added', 'Close', {
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
        this.service.putApplicant(this.service.form.get('id').value, this.service.form.value)
        .pipe(first())
        .subscribe(
          data => {
            this.snackbar.open('Applicant has been Updated', 'Close', {
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

      keyPress(event: any)
      {
        const pattern = '/[0-9\+\-\]/';

      }
}
