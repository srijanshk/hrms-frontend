import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  public forgetPasswordForm: FormGroup;

  constructor(
    private authservice: AuthenticationService,
    private router: Router,
    public snackbar: MatSnackBar,
    public form: FormBuilder
  ) { }

  ngOnInit() {
    this.forgetPasswordForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgetpassword(email: string) {

    this.authservice.forgetpassword(email)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['login']);
        this.snackbar.open('Kindly Check your email address for further instruction', 'Close', {
          duration: 3000,
        });
      },
      error => {
        this.snackbar.open('Enter Valid email address', 'Close', {
          duration: 3000,
        });
      }
    );
  }

}
