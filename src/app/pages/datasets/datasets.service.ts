import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CKAN_User } from '../newgroup/newgroup.component';
import { SignupService } from '../signup/signup.service';
import { ckan, api, portal } from 'conf/terrabrasilisrd_ṕortal.json';

@Injectable({ providedIn: 'root' })
export class DatasetsService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  CKAN_PORT = ckan.port;
  TBRD_API_PORT = api.port;
  HOST = portal.host;

  public async get_ckan_datasets(): Promise<any> {
    const response = await this.http.get(this.HOST+`:`+this.CKAN_PORT+`/api/3/action/package_search`).toPromise();
    return response;
  }

  public async get_ckan_tags(): Promise<any> {
    const response = await this.http.get(this.HOST+`:`+this.CKAN_PORT+`/api/3/action/tag_list`).toPromise();
    return response;
  }

  public async get_ckan_datasets_search(search: string): Promise<any> {
    const response = await this.http.get(this.HOST+`:`+this.CKAN_PORT+`/api/3/action/package_search?q=`+search).toPromise();
    return response;
  }

  public async get_ckan_datasets_bbox_search(bbox: string, datasets: any): Promise<any> {
    const response = await this.http.post(this.HOST+`:`+this.TBRD_API_PORT+`/api/v1.0/bbox_search/`+bbox, datasets).toPromise();
    return response;
  }

  public async get_ckan_dataset(id: string): Promise<any> {
    const response = await this.http.post(this.HOST+`:`+this.CKAN_PORT+`/api/3/action/package_show`,{'id': id}).toPromise();
    return response;
  }

  public async get_license_list(): Promise<any> {
    const response = await this.http.get(this.HOST+`:`+this.CKAN_PORT+`/api/3/action/license_list`).toPromise();
    return response['result'];
  }

  public async create_datasets(name: string, description: string, visibility: boolean, author: string, author_email: string, maintainer: string, license_id: string, collaborators: string, owner_org: string, file_url: string, dataname: string, datadescription: string, dataformat: string, tags: string[], key1: string, value1: string, key2: string, value2: string, key3: string, value3: string, year: number, nameAlpha: string, ckan_api_key: string): Promise<any> {
    
    let tags_dict = tags.map(x => {
      return({'name': x.trim()});
    });

    let key_list = [key1, key2, key3]
    let value_list = [value1, value2, value3]
    var extra = []; 
    
    extra.push({
      value: year,
      key:'Year'
    });

    for (let index = 0; index < 3; index++) {
      if (key_list[index] && value_list[index])
        extra.push({
          value: key_list[index],
          key: value_list[index]
      });
    }
    
    const responseDataset = await this.http.post(this.HOST+`:`+this.CKAN_PORT+`/api/3/action/package_create`, {'name': nameAlpha, 'title': name, 'notes': description, 'private': visibility, 'author': author, 'author_email': author_email, 'maintainer': maintainer, 'license_id': license_id, 'owner_org': owner_org, 'groups': [{"id": collaborators}], 'tags': tags_dict, "extras": extra }, {
      headers: new HttpHeaders ({
        Authorization: ckan_api_key
      })
    }).toPromise();

    let package_id = responseDataset['result']['id']

    const responseResource = await this.http.post(this.HOST+`:`+this.CKAN_PORT+`/api/3/action/resource_create`, {'package_id': package_id, 'name': dataname, 'url': this.HOST+':'+this.TBRD_API_PORT+'/api/v1.0/uploads/'+file_url, 'description': datadescription, 'format': dataformat}, {
      headers: new HttpHeaders ({
        Authorization: ckan_api_key
      })
    }).toPromise();

    return responseDataset;
  }

}