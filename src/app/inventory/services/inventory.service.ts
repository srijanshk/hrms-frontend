import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryFields } from '../inventory-models/inventory-model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  public selectedDevice = null;
  public nextDeviceId = null;

  constructor(private http: HttpClient) { 
    this.getDevices()
      .subscribe((data) => {
        if(data.length > 0) {
          this.nextDeviceId = (data[ data.length - 1].id + 1);
          console.log("get devices: " + this.nextDeviceId);
        }
      });
  }


  public getDevices() {
    const userId = JSON.parse(localStorage.getItem('currentUser')).user._id;
  console.log(environment.inventoryUrl)
  return this.http.get<Array<any>>(environment.inventoryUrl + '/devices');
 }

  public getDevice(id: string) {
    const userId = JSON.parse(localStorage.getItem('currentUser')).user._id;
    return this.http.get(`${environment.inventoryUrl}/${id}`);
  }

  public postDevice(device: any) {
    const userId = JSON.parse(localStorage.getItem('currentUser')).user._id;
    const email = JSON.parse(localStorage.getItem('currentUser')).user.email;
    let data = {
      "id" : device.id,
      "name" : device.name,
      "project" : device.project,
      "device": device.device,
      "startdate": device.startdate,
      "enddate": device.enddate,
      "email": email,
      "userId": userId,
      "status": device.status
      
   };
   
    return this.http.post( environment.inventoryUrl + '/devices', JSON.stringify(data) );
    
  }
  

  public putDevice(device: any) {
    let data = {
      "id" : device.id,
      "name" : device.name,
      "project" : device.project,
      "device": device.device,
      "startdate": device.startdate,
      "enddate": device.enddate
    };
  return this.http.put( `${environment.inventoryUrl + '/devices'}/${device.id}` , JSON.stringify(data) );
}

public deleteDevice(id: string) {
  return this.http.delete(`${environment.inventoryUrl + '/devices'}/${id}`);
}
public approveDevice(id, action) {
 
 const paylods = {id:id, report: action};
 return this.http.patch( environment.inventoryUrl + '/devices', {params: paylods});
}
}