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
        Authorization: '2448c920-f869-4a7b-b5c0-8911c4b86fa1'
      })
    }).toPromise();
    return response;
  }

  public async user_create_db(username: string, password: string, email: string, full_name: string, created_on: string, last_login: string, ckan_api_key: string): Promise<any> {
    const response = await this.http.post(`http://localhost:8090/api/v1.0/users`, {'username': username, 'password': password, 'email': email, 'image': 'assets/images/img_avatar.png', 'created_on': created_on, 'last_login': last_login, 'full_name': full_name, 'ckan_api_key': ckan_api_key}).toPromise();
  return response;
  }

  public async get_activity(ckan_api_key: string): Promise<any> {
    const response = await this.http.post(`http://localhost:5000/api/3/action/dashboard_activity_list`, {'limit': 6}, {
      headers: new HttpHeaders ({
        Authorization: ckan_api_key
      })
    }).toPromise();
    return response;
  }
  
  public async get_users_ckan(): Promise<any> {
    const response = await this.http.get(`http://localhost:5000/api/3/action/user_list`, {
      headers: new HttpHeaders ({
        Authorization: '2448c920-f869-4a7b-b5c0-8911c4b86fa1'
      })
    }).toPromise();
    return response;
  }
  
  public async organization_show(id: string): Promise<any> {
    const response = await this.http.post(`http://localhost:5000/api/3/action/organization_show`, {'id': id}, {
      headers: new HttpHeaders ({
        Authorization: '2448c920-f869-4a7b-b5c0-8911c4b86fa1'
      })
    }).toPromise();
    return response;
  }

}