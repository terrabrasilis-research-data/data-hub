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
        Authorization: 'ded487d5-e219-447c-95af-ad55b4a70d80'
      })
    }).toPromise();
    return response;
  }

  public async user_create_db(username: string, password: string, email: string, full_name: string, created_on: string, last_login: string, ckan_api_key: string): Promise<any> {
    const response = await this.http.post(`http://localhost:8090/api/v1.0/users`, {'username': username, 'password': password, 'email': email, 'image': 'assets/images/img_avatar.png', 'created_on': created_on, 'last_login': last_login, 'full_name': full_name, 'ckan_api_key': ckan_api_key}).toPromise();
  return response;
  }
}