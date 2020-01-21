import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SignupService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  public async user_create(name: string, email: string, password: string, full_name: string): Promise<any> {
    const response = await this.http.post(`http://localhost:5000/api/3/action/user_create`, {'name': name, 'email': email, 'password': password, 'fullname': full_name}, {
      headers: new HttpHeaders ({
        Authorization: 'e4794835-de49-4993-a0fd-1a4adabc0c38'
      })
    }).toPromise();
    return response;
  }

}