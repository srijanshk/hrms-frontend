import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormServices } from '../../../shared/services/form';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { InterviewerService } from '../../services/interviewer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.css']
})
export class InterviewerComponent implements OnInit {
  public loading = false;
  public submitted = false;
  formErrors = {
    name : '',
    personalDetails: '',
    requiredExperience: '',
    dueDate: '',
  };
public photo: any='';
  constructor(
    public form: FormBuilder,
    public formService: FormServices,
    public snackbar: MatSnackBar,
    private router: Router,
    public service: InterviewerService,
    private dialogRef:MatDialogRef<InterviewerComponent>
  ) { }



  onSubmit() {
    this.submitted = true;
    this.formService.markFormGroupTouched(this.service.form);
    if (this.service.form.valid) {
      if(!this.service.form.get('id').value)
      {
       this.service.postInterviewer(this.service.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.snackbar.open('Interviewer has been Added', 'Close', {
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
        this.service.putInterviewer(this.service.form.get('id').value, this.service.form.value)
        .pipe(first())
        .subscribe(
          data => {
            this.snackbar.open('Interviewer has been Updated', 'Close', {
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

  onSelectFile(event:any){
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload =(event: ProgressEvent) =>{
            this.photo = (<FileReader>event.target).result;
          }
          reader.readAsDataURL(event.target.files[0]); 
        }
  }
}
