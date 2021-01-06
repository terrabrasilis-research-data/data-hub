import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupService } from '../signup/signup.service';
import { api } from 'conf/terrabrasilisrd_portal.json';


@Injectable({ providedIn: 'root' })
export class LoginService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  TBRD_API_PORT = api.port;
  API_HOST = api.host;

  public async user_login(username: string, password: string): Promise<any> {
    const response = await this.http.post(this.API_HOST+`:`+this.TBRD_API_PORT+`/api/v1.0/login`, {'username': username, 'password': password}).toPromise();
    return response;
  }


}
