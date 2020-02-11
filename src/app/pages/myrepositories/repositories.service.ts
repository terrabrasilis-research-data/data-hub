import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RepositorieService {

  /** start http service client */
  constructor(private http: HttpClient) {
  }

  public async repositorie_create(userToken: string, name: string, description: string, collaborators: number, maintainer: string, categorie: number, keywords: string, postgres: boolean, geoserver: boolean, geonetwork: boolean, terrama2: boolean, owncloud: boolean, created_on: string): Promise<any> {
 
    let postgres_service_id
    let geoserver_service_id
    let geonetwork_service_id
    let terrama2_service_id
    let owncloud_service_id

    /*
    CREATE REPOSITORIE
    */
   const responseRepo = await this.http.post(`http://127.0.0.1:8090/api/v1.0/repositories`, {'name': name, 'abstract': description,  'maintainer': maintainer, 'created_on': created_on}, {
    headers: new HttpHeaders ({
        Authorization: 'Bearer ' + userToken
    })
    }).toPromise();
    
    let repo_id = responseRepo[0]['repo_id']
 
    /*
    CREATE HOST
    */
    const responseHost = await this.http.post(`http://127.0.0.1:8090/api/v1.0/hosts`, {'name': name, 'address': '255.255.255.255/'+name,  'created_on': created_on}, {
        headers: new HttpHeaders ({
            Authorization: 'Bearer ' + userToken
        })
        }).toPromise();
    
    let host_id = responseHost[0]['host_id']

    if(postgres == true){

        /*
        CREATE SERVICE - POSTGRES
        */
        const responsePostgres = await this.http.post(`http://127.0.0.1:8090/api/v1.0/services`, {'name': 'PostgreSQL', 'machine': 1, 'host_id': host_id, 'created_on': created_on}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
            
            postgres_service_id = responsePostgres[0]['service_id']

            /*
            CREATE SERVICE_PORT_REL - POSTGRES
            */
            const responsePortServicePostgres = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_port_rel`, {'port_id': 1, 'service_id': postgres_service_id}, {
                headers: new HttpHeaders ({
                    Authorization: 'Bearer ' + userToken
                })
                }).toPromise();
            
           /*
           CREATE SERVICE_HOST_REL - POSTGRES
           */
           const responseHostServicePostgres = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_host_rel`, {'host_id': host_id, 'service_id': postgres_service_id}, {
            headers: new HttpHeaders ({
                    Authorization: 'Bearer ' + userToken
                })
                }).toPromise();

           /*
           CREATE SERVICE_REPO_REL - POSTGRES
           */
           const responseRepoServicePostgres = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_repositorie_rel`, {'repo_id': repo_id, 'service_id': postgres_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
    }

    if(geoserver == true){

        /*
        CREATE SERVICE - GEOSERVER
        */
        const responseGeoserver = await this.http.post(`http://127.0.0.1:8090/api/v1.0/services`, {'name': 'Geoserver', 'machine': 1, 'host_id': host_id, 'created_on': created_on}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
            
            geoserver_service_id = responseGeoserver[0]['service_id']

            /*
            CREATE SERVICE_PORT_REL - GEOSERVER
            */
            const responsePortServiceGeoserver = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_port_rel`, {'port_id': 2, 'service_id': geoserver_service_id}, {
                headers: new HttpHeaders ({
                    Authorization: 'Bearer ' + userToken
                })
                }).toPromise();
            
           /*
           CREATE SERVICE_HOST_REL - GEOSERVER
           */
           const responseHostServiceGeoserver = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_host_rel`, {'host_id': host_id, 'service_id': geoserver_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();

           /*
           CREATE SERVICE_REPO_REL - GEOSERVER
           */
           const responseRepoServiceGeoserver = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_repositorie_rel`, {'repo_id': repo_id, 'service_id': geoserver_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
    }

    if(geonetwork == true){

        /*
        CREATE SERVICE - GEONETWORK
        */
        const responseGeonetwork = await this.http.post(`http://127.0.0.1:8090/api/v1.0/services`, {'name': 'Geonetwork', 'machine': 1, 'host_id': host_id, 'created_on': created_on}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
            
            geonetwork_service_id = responseGeonetwork[0]['service_id']

            /*
            CREATE SERVICE_PORT_REL - GEONETWORK
            */
            const responsePortServiceGeonetwork = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_port_rel`, {'port_id': 2, 'service_id': geonetwork_service_id}, {
                headers: new HttpHeaders ({
                    Authorization: 'Bearer ' + userToken
                })
                }).toPromise();

           /*
           CREATE SERVICE_HOST_REL - GEONETWORK
           */
           const responseHostServiceGeonetwork = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_host_rel`, {'host_id': host_id, 'service_id': geonetwork_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
            
           /*
           CREATE SERVICE_REPO_REL - GEONETWORK
           */
           const responseRepoServiceGeonetwork = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_repositorie_rel`, {'repo_id': repo_id, 'service_id': geonetwork_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
    }

    if(terrama2 == true){

        /*
        CREATE SERVICE - TERRAMA2
        */
        const responseTerraMA2 = await this.http.post(`http://127.0.0.1:8090/api/v1.0/services`, {'name': 'TerraMA2', 'machine': 1, 'host_id': host_id, 'created_on': created_on}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
            
            terrama2_service_id = responseTerraMA2[0]['service_id']

           /*
           CREATE SERVICE_PORT_REL - TERRAMA2
           */
           const responsePortServiceTerraMA2 = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_port_rel`, {'port_id': 2, 'service_id': terrama2_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();

           /*
           CREATE SERVICE_HOST_REL - TERRAMA2
           */
           const responseHostServiceTerraMA2 = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_host_rel`, {'host_id': host_id, 'service_id': terrama2_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();

           /*
           CREATE SERVICE_REPO_REL - TERRAMA2
           */
           const responseRepoServiceTerraMA2 = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_repositorie_rel`, {'repo_id': repo_id, 'service_id': terrama2_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
    }

    if(owncloud == true){

        /*
        CREATE SERVICE - OWNCLOUD
        */
        const responseOwnCloud = await this.http.post(`http://127.0.0.1:8090/api/v1.0/services`, {'name': 'OwnCloud', 'machine': 1, 'host_id': host_id, 'created_on': created_on}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
            
            owncloud_service_id = responseOwnCloud[0]['service_id']

           /*
           CREATE SERVICE_PORT_REL - OWNCLOUD
           */
           const responsePortServiceOwnCloud = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_port_rel`, {'port_id': 2, 'service_id': owncloud_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();

           /*
           CREATE SERVICE_HOST_REL - OWNCLOUD
           */
           const responseHostServiceOwnCloud = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_host_rel`, {'host_id': host_id, 'service_id': owncloud_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();

           /*
           CREATE SERVICE_REPO_REL - OWNCLOUD
           */
           const responseRepoServiceowncloud = await this.http.post(`http://127.0.0.1:8090/api/v1.0/service_repositorie_rel`, {'repo_id': repo_id, 'service_id': owncloud_service_id}, {
            headers: new HttpHeaders ({
                Authorization: 'Bearer ' + userToken
            })
            }).toPromise();
    }

    /*
    CREATE CATEGORIE_REPOSITORIE
    */
    const responseCategorieRepositorie = await this.http.post(`http://127.0.0.1:8090/api/v1.0/categorie_repositorie_rel`, {'repo_id': repo_id, 'categorie_id': categorie}, {
    headers: new HttpHeaders ({
        Authorization: 'Bearer ' + userToken
    })
    }).toPromise();

    /*
    CREATE GROUP_REPOSITORIE
    */
   const responseGroupRepositorie = await this.http.post(`http://127.0.0.1:8090/api/v1.0/group_repositorie_rel`, {'repo_id': repo_id, 'group_id': collaborators}, {
    headers: new HttpHeaders ({
        Authorization: 'Bearer ' + userToken
    })
    }).toPromise();
    
    return responseRepo

}
}