import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  public async user_login(username: string, password: string): Promise<any> {
    const response = await this.http.post(`http://localhost:8090/api/v1.0/login`, {'username': username, 'password': password}).toPromise();
    return response;
  }


}