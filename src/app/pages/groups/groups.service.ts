import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GroupsService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  public async get_groups(): Promise<any> {
    const response = await this.http.get(`http://127.0.0.1:8090/api/v1.0/groups`).toPromise();
    return response['groups'];
  }

  public async get_categories(): Promise<any> {
    const response = await this.http.get(`http://127.0.0.1:8090/api/v1.0/categories`).toPromise();
    return response;
  }

}