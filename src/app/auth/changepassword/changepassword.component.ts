import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;
  hide1 = true;
  hide2 = true;
  hide3 = true;

  constructor(
    private authservice: AuthenticationService,
    private router: Router,
    public snackbar: MatSnackBar,
    public form: FormBuilder
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.form.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  updatePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    this.authservice.changepassword(oldPassword, newPassword, confirmPassword)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/dashboard/home']),
          this.snackbar.open('Password Updated', 'Close', {
            duration: 3000,
          });
      },
      error => {
        if (newPassword !== confirmPassword) {
          this.snackbar.open('New Password dont match', 'Close', {
            duration: 3000,
          });
        } this.snackbar.open('Old Password Did not match', 'Close', {
          duration: 3000,
        });
      }
    );
  }

}
