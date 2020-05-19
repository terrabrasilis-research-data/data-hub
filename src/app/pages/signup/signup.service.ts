import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SignupService {
  
  /** start http service client */
  constructor(private http: HttpClient) {
  
  }
  
  public static API_KEY= '4b6df95f-911f-4ce4-8957-91a0bbc99a8e';
 
  public async user_create(name: string, email: string, password: string, full_name: string, time: string): Promise<any> {
    
    const response = await this.http.post(`http://localhost:5000/api/3/action/user_create`, {'name': name, 'email': email, 'password': password, 'fullname': full_name}, {
      headers: new HttpHeaders ({
        Authorization: SignupService.API_KEY
      })
    }).toPromise();

    let apikey = response['result'].apikey

    const response2 = await this.http.post(`http://localhost:8090/api/v1.0/users`, {'username': name, 'password': password, 'email': email, 'image': 'assets/images/img_avatar.png', 'created_on': time, 'last_login': time, 'full_name': full_name, 'ckan_api_key': apikey}).toPromise();
    
    return response2;
  }

  public async user_update(userToken: string, user_id: number, username: string, email: string, password: string, full_name: string, created_on: string, last_login:string, image: string, apikey: string): Promise<any> {
    
    const response = await this.http.put(`http://localhost:8090/api/v1.0/users/`+user_id, { 'username': username, 'password': password, 'email': email, 'image': 'http://localhost:8090/api/v1.0/uploads/'+image, 'created_on': created_on, 'last_login': last_login, 'full_name': full_name, 'ckan_api_key': apikey }, {
      headers: new HttpHeaders ({
          Authorization: 'Bearer ' + userToken
      })
      }).toPromise();

    return response;
  }

  public async get_members(id: string): Promise<any> {
    const response = await this.http.post(`http://localhost:5000/api/3/action/member_list`, {'id': id, 'object_type': 'user'}, {
      headers: new HttpHeaders ({
        Authorization: SignupService.API_KEY
      })
    }).toPromise();
    return response;
  }

  public async get_users_ckan(): Promise<any> {
    const response = await this.http.get(`http://localhost:5000/api/3/action/user_list`, {
      headers: new HttpHeaders ({
        Authorization: SignupService.API_KEY
      })
    }).toPromise();
    return response;
  }
  
  public async organization_show(id: string): Promise<any> {
    const response = await this.http.post(`http://localhost:5000/api/3/action/organization_show`, {'id': id}, {
      headers: new HttpHeaders ({
        Authorization: SignupService.API_KEY
      })
    }).toPromise();
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
  
}