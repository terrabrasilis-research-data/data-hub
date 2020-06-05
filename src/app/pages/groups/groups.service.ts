import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CKAN_User } from '../newgroup/newgroup.component';
import { SignupService } from '../signup/signup.service';

@Injectable({ providedIn: 'root' })
export class GroupsService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  CKAN_PORT = '5000';
  TBRD_API_PORT = '8090';
  
  public async get_groups(): Promise<any> {
    const response = await this.http.get(`http://localhost:`+this.TBRD_API_PORT+`/api/v1.0/groups`).toPromise();
    return response['groups'];
  }

  public async get_groups_from_user(user_id: number): Promise<any> {
    const response = await this.http.get(`http://localhost:`+this.TBRD_API_PORT+`/api/v1.0/groups_from_user/`+ user_id).toPromise();
    return response['groups'];
  }

  public async get_categories(): Promise<any> {
    const response = await this.http.get(`http://localhost:`+this.TBRD_API_PORT+`/api/v1.0/categories`).toPromise();
    return response;
  }

  public async get_users(): Promise<any> {
    const response = await this.http.get(`http://localhost:`+this.CKAN_PORT+`/api/3/action/user_list`).toPromise();
    return response;
  }

  public async get_users_db(): Promise<any> {
    const response = await this.http.get(`http://localhost:`+this.TBRD_API_PORT+`/api/v1.0/users`).toPromise();
    return response;
  }

  public async get_user(user_id: number): Promise<any> {
    const response = await this.http.get(`http://localhost:`+this.TBRD_API_PORT+`/api/v1.0/users/`+user_id).toPromise();
    return response;
  }

  public async create_group(userToken: string, name: string, description: string, image: string, maintainer: string, language: string, users: CKAN_User[], created_on: string, groupurl: string, ckan_api_key: string): Promise<any> {
          
    /*
    CREATE GROUP CKAN
    */
    const responseGroupCkan = await this.http.post(`http://localhost:`+this.CKAN_PORT+`/api/3/action/group_create`, {'name': groupurl, 'title': name, 'description': description, 'state': 'active', 'users': users }, {
      headers: new HttpHeaders ({
        Authorization: ckan_api_key
      })
    }).toPromise();

    let ckan_group_id = responseGroupCkan['result']['id']
    
    /*
    CREATE GROUP
    */
    const reponseGroup = await this.http.post(`http://localhost:`+this.TBRD_API_PORT+`/api/v1.0/groups`, {'name': name, 'abstract': description,  'maintainer': maintainer, 'created_on': created_on, 'language': language, 'ckan_group_id': ckan_group_id, 'image': 'http://localhost:'+this.TBRD_API_PORT+'/api/v1.0/uploads/'+image}, {
      headers: new HttpHeaders ({
          Authorization: 'Bearer ' + userToken
      })
      }).toPromise();
      
      let group_id = reponseGroup[0]['group_id']

    for (let index = 0; index < users.length; index++) {
      
      /*
      CREATE USER_GROUP_REL
      */
      const responseUserGroup = await this.http.post(`http://localhost:`+this.TBRD_API_PORT+`/api/v1.0/user_group_rel`, {'user_id': users[index].user_id, 'group_id': group_id}, {
        headers: new HttpHeaders ({
            Authorization: 'Bearer ' + userToken
        })
        }).toPromise();
    }

      return reponseGroup;
  }
}