import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupService } from '../signup/signup.service';
import { ckan, api, portal } from 'conf/terrabrasilisrd_ṕortal.json';


@Injectable({ providedIn: 'root' })
export class LoginService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  TBRD_API_PORT = api.port;
  HOST = portal.host;

  public async user_login(username: string, password: string): Promise<any> {
    const response = await this.http.post(this.HOST+`:`+this.TBRD_API_PORT+`/api/v1.0/login`, {'username': username, 'password': password}).toPromise();
    return response;
  }


}