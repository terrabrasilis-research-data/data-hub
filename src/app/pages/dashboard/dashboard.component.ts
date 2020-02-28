import { Component, OnInit } from '@angular/core';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { GroupsService } from '../groups/groups.service';
import { RepositorieService } from '../myrepositories/repositories.service';
import { SignupService } from '../signup/signup.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private rs:RepositorieService,
    private gs:GroupsService,
    private ss:SignupService,
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
    this.getActivity();
    this.get_users_ckan();
    this.getRepositorie(1);

    document.getElementById("wrapper").className = "d-flex";
  }
  
  async getGroups(){
    const response = await this.gs.get_groups();
    this.groups = response;
  }

  async getActivity(){
    const response = await this.ss.get_activity(this.user['user']['ckan_api_key']);
    this.activities_list = response['result']
  }

  async get_users_ckan(){
    const response = await this.ss.get_users_ckan();
    this.ckan_users = response['result'];
  }

  getUser(id: string){
    return this.ckan_users.filter(x => (x.id == id))[0]['display_name'];    
  }

  getActivityName(type: string){
    if(this.activity_dict.filter(x => (x.ckan_activity_type == type)).length == 1)
      return this.activity_dict.filter(x => (x.ckan_activity_type == type))[0]['activity_string']
    else
      return type
  }

  servicepath(name: string){
    if (name == "PostgreSQL")
      return true
    else
      return false
   }
   
  services = [];
  
  repositorie = [];
  
  organizations = [];

  activities_list = [];

  ckan_users = [];
  
  activity_dict = [
    {"ckan_activity_type": "new organization", "activity_string": "created a repository"},
    {"ckan_activity_type": "new user", "activity_string": "signed up"},
    {"ckan_activity_type": "new group", "activity_string": "created the group "}
  ];

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

   async getRepositorie(id){

    const response = await this.rs.get_repositorie(id);
    this.repositorie = response['repositorie'];
    this.services = this.repositorie[0].services;
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
