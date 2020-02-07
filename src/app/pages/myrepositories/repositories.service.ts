import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RepositorieService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  public async repositorie_create(userToken: string, name: string, description: string, collaborators: number, maintainer: string, categorie: number, keywords: string, postgres: boolean, geoserver: boolean, geonetwork: boolean, terrama2: boolean, owncloud: boolean, created_on: string): Promise<any> {


    const response = await this.http.post(`http://127.0.0.1:8090/api/v1.0/repositories`, {'name': name, 'abstract': description,  'maintainer': maintainer, 'created_on': created_on}, {
        headers: new HttpHeaders ({
            Authorization: 'Bearer ' + userToken
        })
        }).toPromise();
        return response;
    }


    
}