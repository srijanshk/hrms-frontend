import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormServices } from 'src/app/shared/services/form';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

export interface Device {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  public InventoryFields: FormGroup;

  formErrors = {
    name: '',
    project: '',
    device: '',
    startdate: '',
    enddate: ''
};


constructor(public form: FormBuilder, 
  public formService: FormServices, 
  public router: Router, public service: InventoryService,
   public snackbar: MatSnackBar,
   private dialogRef:MatDialogRef<AddDeviceComponent>
  ) { }

ngOnInit() {
  this.deviceform();
}

public deviceform() {
  this.InventoryFields = this.form.group({
    name: [''],
    project: [''],
    device: [''],
    startdate: [''],
    enddate: ['']
  })
}
closeDialog = function() {
  this.dialogRef.close();
};


submit() {
  // const userEmail = JSON.parse(localStorage.getItem('currentUser')).user.email;
    // this.InventoryFields.value.email = userEmail;
  const device = Object.assign({}, this.InventoryFields.value);
  // this.service.postDevice(this.InventoryFields.value)
  this.service.postDevice(device).pipe(first()).subscribe(data => {
    this.snackbar.open('Submitted successfully', 'Close', {
      duration: 2000,
    })
  },
  error => {
    this.snackbar.open('Unsuccessful', 'Close', {

    });
  });
  this.closeDialog();
  this.router.navigate(['/dashboard/inventory/list']);
}
}

