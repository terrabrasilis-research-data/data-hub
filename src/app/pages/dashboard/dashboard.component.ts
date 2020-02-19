import { Component, OnInit } from '@angular/core';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { GroupsService } from '../groups/groups.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private gs:GroupsService,
    private store: Store<fromLogin.AppState>,
  ) {
    this.store.pipe(select('login')).subscribe(res => {
      if(res){
        this.user = res;
      }
  })
}

 public user: any = null;
 
  ngOnInit() {
    this.getGroups();
    document.getElementById("wrapper").className = "d-flex";
  }
  
  async getGroups(){
    const response = await this.gs.get_groups();
    this.groups = response;
  }

  services: Service[] = [
    {"id": 1, "address": "172.17.01", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "PostgreSQL", "ports": ["5432"]}, 
    {"id": 2, "address": "172.17.02", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "GeoServer", "ports": ["5555", "5050"]}, 
    {"id": 3, "address": "172.17.03", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "GeoNetwork", "ports": ["5000"]}
  ]

  activities: Activities[] = [
    {"username": "Gabriel", "activity_type": "updated the dataset", "package_name": "ASGS Geographic Correspondences (2016)", "package_id": "1", "timestamp": "Wed, 04 Sep 2019 14:48:54 GMT"},
    {"username": "Gabriel", "activity_type": "updated the dataset", "package_name": "ASGS Geographic Correspondences (2011)", "package_id": "2", "timestamp": "Wed, 04 Sep 2019 14:48:54 GMT"},
    {"username": "João", "activity_type": "updated the dataset", "package_name": "ASGS Geographic Correspondences (2006)", "package_id": "3", "timestamp": "Wed, 04 Sep 2019 14:48:54 GMT"},
    {"username": "Lucas", "activity_type": "updated the dataset", "package_name": "ASGS Geographic Correspondences (2001)", "package_id": "4", "timestamp": "Wed, 04 Sep 2019 14:48:54 GMT"},
  ]

  datasets: Dataset[] = [
    {"dataset_id": 1, "name": "Radiocarbon ages and pollen record of Kongor Lake sediments", "authors": ["Krahl Guilherme", "Jairo Francisco","Cornils Astrid"], "year": 2019},
    {"dataset_id": 2, "name": "Multiple proxy data at DSDP Site 72-516F and ODP Hole 171-1049C during Dan-C2 and lower C29n", "authors": ["Jairo Francisco","Cornils Astrid"],"year": 2018},
    {"dataset_id": 3, "name": "Latest Maastrichtian dinocyst and benthic foraminiferal records of Bass River, Meirs Farm and Search Farm sediment cores, New Jersey, USA", "authors": ["Cornils Astrid"],"year": 2017},
    {"dataset_id": 4, "name": "Clumped isotope measurements of Mesozoic belemnites from southern high latitudes", "authors": ["Francisco Jairo","Cornils Astrid"],"year": 2016},
    {"dataset_id": 5, "name": "Sedimentary Fe speciation and Fe isotope compositions from SONNE cruise SO241", "authors": ["Guilherme Krahl", "Jairo Francisco","Cornils Astrid"],"year": 2015},
    {"dataset_id": 6, "name": "Organic and inorganic geochemical data of sediment cores XC-03 and XC-01-2, Xingu River, Amazon Basin", "authors": ["Cornils Astrid"],"year": 2014},
    {"dataset_id": 7, "name": "Tephra data of sediment cores of the Black Sea covering MIS 6 (184-130 ka BP)", "authors": ["Astrid Cornils"],"year": 2019},
    {"dataset_id": 8, "name": "High resolution in situ temperatures across coral reef slopes: Iriomote-jima, Japan and Gulf of Chiriquí, Panama", "authors": ["Guilherme Krahl", "Jairo Francisco","Cornils Astrid"],"year": 2016},   
  ]
  
    groups: Group[]; 
  
    checkServiceStatus(id: number){
   return true;
   }
}

export interface Group {
  group_id: number;
  authors: Array < string >;
  name: string;
  year: number;
  abstract: string;
  image: string;
}

export interface Activities {
  username: string;
  activity_type: string;
  package_name: string;
  package_id: string;
  timestamp: string;

}

export interface Service {
  id: number;
  address: string;
  created_on: string;
  name: string;
  ports: Array < string >;
}

export interface Dataset {
  dataset_id: number;
  authors: Array < string >;
  name: string;
  year: number;
}
