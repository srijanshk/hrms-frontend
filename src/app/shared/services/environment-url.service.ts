import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  public userUrl: string = environment.userUrl;
  public recruitmentUrl: string = environment.recruitmentUrl;
  public uploadUrl: string = environment.uploadUrl;

  constructor() { }
}
 