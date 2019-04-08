import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide1 = true;
  hide2 = true;

  public resetpasswordform: FormGroup;

  constructor(
    private authservice: AuthenticationService,
    private router: Router,
    public snackbar: MatSnackBar,
    public form: FormBuilder
  ) { }

  ngOnInit() {
    this.resetpasswordform = this.form.group({
      newPassword : ['', [Validators.required]],
      verifyPassword : ['', [Validators.required]]
    });
  }
  resetpassword(newPassword: string, verifyPassword: string) {

  if (newPassword === verifyPassword) {


    this.authservice.resetpassword(newPassword, verifyPassword)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['login']);
        this.snackbar.open('Your Password Have Benn Updated', 'Close', {
          duration: 3000,
        });
      },
      error => {
        this.snackbar.open('Please Check your password', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  }

}
