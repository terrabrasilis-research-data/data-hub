import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SignupService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  public async user_create(name: string, email: string, password: string, full_name: string): Promise<any> {
    const response = await this.http.put(`http://localhost:5000/api/3/action/user_create`, {'name': name, 'email': email, 'password': password, 'fullname': full_name}).toPromise();
    return response;
  }

}

//{ Authorization: '0498a5c2-24a5-4848-a23b-29044879c1fa' }