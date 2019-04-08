import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {
  devices: Array<any> = [];
  deviceId = null;
  displayForm: boolean = false;
  constructor(public service: InventoryService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.service.getDevices()
      .subscribe((data) => {
        this.devices = data;
        console.log(this.devices);
      });

    this.service.selectedDevice = {
      "id": null,
      "name": '',
      "project": '',
      "device": '',
      "startdate": '',
      "enddate": ''
    };
  }

  public onSubmit(form: FormGroup) {
    location.reload();
    console.log(form.value);
    if (form.value.id == null) {
      this.service.postDevice(form.value)
        .subscribe((resp) => {
          console.log(resp);
          if (resp["status"] == 201) {
            this.service.getDevices()
              .subscribe((data) =>
                this.devices = data);
          }
        });
    } else {
      this.service.putDevice(form.value)
        .subscribe((resp) => {
          console.log(resp);
          if (resp["status"] == 200) {

            this.updateList(form.value);
          }
        });
    }
  }
  public onEdit(id: string) {
    this.service.getDevice(id)
      .subscribe((data) => {
        this.service.selectedDevice = data;
      });

  }
  public updateList(device: any) {
    for (var i = 0; i < this.devices.length; i++) {
      if (device.id == this.devices[i].id) {
        this.devices[i] = device;
        return;
      }
    }
  }

  public clearForm() {
    this.service.selectedDevice = {
      "id": null,
      "name": '',
      "project": '',
      "device": '',
      "startdate": '',
      "enddate": ''
    };
  }
}
