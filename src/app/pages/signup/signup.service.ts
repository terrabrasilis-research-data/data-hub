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
        Authorization: 'b1b9a6fd-a02a-4467-aaeb-d7aaaa77decb'
      })
    }).toPromise();
    return response;
  }

  public async user_create_db(username: string, email: string, full_name: string, created_on: string, last_login: string): Promise<any> {
    const response = await this.http.post(`http://localhost:8090/api/v1.0/users`, {'username': username, 'email': email, 'image': 'assets/images/img_avatar.png', 'created_on': created_on, 'last_login': last_login, 'full_name': full_name}, {
      headers: new HttpHeaders ({
        "Authorization": "Basic " + btoa("gabriel:gabriel"),
      }) 
  }).toPromise();
  return response;
  }
}