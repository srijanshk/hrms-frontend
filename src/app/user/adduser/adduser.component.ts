import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormServices } from '../../shared/services/form';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  public AddUserForm: FormGroup;
  public loading = false;
  public submitted = false;
  formErrors = {
    email : '',
    role: '',
    fullname: '',
    contactNo: '',
    post: '',
    branch: '',
    lineManager: '',
    Project: ''
  };

  constructor(
    public form: FormBuilder,
    public formService: FormServices,
    public snackbar: MatSnackBar,
    private router: Router,
    private AuthService: AuthenticationService,
  ) { }



  public addUser() {
    this.submitted = true;

    // mark all fields as touched
    this.formService.markFormGroupTouched(this.AddUserForm);

    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of wether it's touched

    if (this.AddUserForm.valid) {
      this.AuthService.register(this.AddUserForm.value)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate(['dashboard/user']);
          this.snackbar.open('User has been Added', 'Close', {
            duration: 3000,
          });
        },
        error => {
          this.loading = false;
          this.snackbar.open('Unsuccessful', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.formErrors = this.formService.validateForm(this.AddUserForm, this.formErrors, false);
    }

  }

  // build the user edit form
  public buildForm() {
    this.AddUserForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      post: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      lineManager: ['', [Validators.required]],
    });
    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object

    this.AddUserForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.AddUserForm, this.formErrors, true);
    });
  }


// initiate component
  ngOnInit() {
    this.buildForm();
  }

}
