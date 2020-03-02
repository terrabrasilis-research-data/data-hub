import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CKAN_User } from '../newgroup/newgroup.component';

@Injectable({ providedIn: 'root' })
export class DatasetsService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  public async get_datasets(): Promise<any> {
    const response = await this.http.get(`http://127.0.0.1:8000/get_datasets.json`).toPromise();
    return response;
  }

  public async get_license_list(): Promise<any> {
    const response = await this.http.get(`http://localhost:5000/api/3/action/license_list`).toPromise();
    return response['result'];
  }

  public async create_datasets(name: string, description: string, visibility: boolean, author: string, author_email: string, maintainer: string, license_id: string, collaborators: string, owner_org: string, dataurl: string, dataname: string, datadescription: string, dataformat: string, ckan_api_key: string): Promise<any> {
    const responseDataset = await this.http.post(`http://localhost:5000/api/3/action/package_create`, {'name': name, 'title': name, 'notes': description, 'private': visibility, 'author': author, 'author_email': author_email, 'maintainer': maintainer, 'license_id': license_id, 'owner_org': owner_org, 'groups': [{"id": collaborators}] }, {
      headers: new HttpHeaders ({
        Authorization: ckan_api_key
      })
    }).toPromise();

    let package_id = responseDataset['result']['id']
    
    const responseResource = await this.http.post(`http://localhost:5000/api/3/action/resource_create`, {'package_id': package_id, 'name': dataname, 'url': dataurl, 'description': datadescription, 'format': dataformat}, {
      headers: new HttpHeaders ({
        Authorization: ckan_api_key
      })
    }).toPromise();

    return responseDataset;
  }

}