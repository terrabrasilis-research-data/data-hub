import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SignupService {
  
  /** start http service client */
  constructor(private http: HttpClient) {
  
  }
  
  public static API_KEY= 'b38c04be-6e1a-4729-a0af-87852aa45237';
 
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