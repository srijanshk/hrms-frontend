import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FormServices } from 'src/app/shared/services/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public formErrors = {
    email: '',
    password: '',
  };

  constructor(
    public form: FormBuilder,
    public FormService: FormServices,
    public snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthenticationService
  ) {


  }

  public onSubmit(email, password) {
    this.submitted = true;

    // mark all fields as touched
    this.FormService.markFormGroupTouched(this.loginForm);

    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of wether it's touched
    if (this.loginForm.valid) {
      this.authService.login(email, password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);

          this.snackbar.open('Successfully loggedin', 'Close', {
            duration: 3000,
          });
        },
        error => {
           this.loading = false;
          this.snackbar.open('Enter Valid email address and password', 'Close', {
            duration: 3000,
          });
        });
    } else {
      this.formErrors = this.FormService.validateForm(this.loginForm, this.formErrors, false);
    }
  }

  public buildForm() {

    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

     // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.loginForm.valueChanges.subscribe((data) => {
      this.formErrors = this.FormService.validateForm(this.loginForm, this.formErrors, true);
    });

}
public ngOnInit() {
  this.buildForm();
}
}
