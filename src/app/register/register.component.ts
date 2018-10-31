import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CustomValidators } from '../services/custom_ validators';
import { UserService } from '../services/user.service';
import { FormService } from '../services/form';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'

})
export class RegisterComponent implements OnInit {
 public registerForm: FormGroup;
 public loading = false;
 public submitted = false;
  formErrors = {
    email : '',
    password: '',
  };

  constructor(
    public form: FormBuilder,
    public formService: FormService,
    public snackbar: MatSnackBar,
    private router: Router,
    private userService: UserService

  ) {}
  public signUp() {
    this.submitted  = true;

    // mark all fields as touched
    this.formService.markFormGroupTouched(this.registerForm);

    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of wether it's touched
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(['/login']);
              this.snackbar.open('Succesfully submitted a valid form. yay!', 'Close', {
                duration: 3000,
              });
          },
          error => {
              this.loading = false;
              this.snackbar.open('Unsuccessful', 'Close', {
                duration: 3000,
              });
          });

      // this.registerForm.reset();
    } else {
      this.formErrors = this.formService.validateForm(this.registerForm, this.formErrors, false);
    }


    }


  // build the user edit form
  public buildForm() {
    this.registerForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.registerForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.registerForm, this.formErrors, true);
    });
  }

  // initiate component
  public ngOnInit() {
    this.buildForm();
  }


}
