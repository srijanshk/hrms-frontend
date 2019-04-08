import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from '../../shared/services/environment-url.service';
import { UserInfo } from 'src/app/user/models/user-model';
import { Observable } from 'rxjs';
import { Post } from '../models/image-model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private posts: Post[] = [];
  constructor(
    private http: HttpClient,
    private environment: EnvironmentUrlService
  ) { }

  createNewProfile(userinfo: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${this.environment.userUrl}/userinfo`, userinfo);
  }
  getProfileByUserId(user_id) {
    return this.http.get(`${this.environment.userUrl}/userinfo/${user_id}`);
  }
  getProfilebyId(id) {
    return this.http.get(`${this.environment.userUrl}/userinfo/get/${id}`);
  }
  updateProfile(id, userinfo: UserInfo) {
    return this.http.put(`${this.environment.userUrl}/userinfo/${id}`, userinfo);
  }
  uploadProfileImage(data) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post(`${this.environment.userUrl}/uploads`, data, httpOptions);
  }
}
