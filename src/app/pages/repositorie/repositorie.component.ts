import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositorieService } from '../myrepositories/repositories.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-repositorie',
  templateUrl: './repositorie.component.html',
  styleUrls: ['./repositorie.component.scss']
})

export class RepositorieComponent implements OnInit, OnDestroy  {

  id: number;
  private sub: any;

  created_on = "";
  categories = "";
  repo_name = "";
  repo_abstract = "";
  repo_id = "";
  user_email = "";
  maintainer = "";
  services = [];

  users: User[];

  repositorie = [];

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
  
  constructor(private route: ActivatedRoute, private rs:RepositorieService, private store: Store<fromLogin.AppState>) { this.store.pipe(select('login')).subscribe(res => {
    if(res){
      this.user = res;
    }
  }) }
  
  public user: any = null;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
    });
    this.getRepositorie(this.id);
    this.getMembers(this.id);
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  checkServiceStatus(id: number){
   // if (id == 2){
   //     return false;
   // } else {
   //   return true;
   // }
  return true;
  }
  
  servicepath(name: string){
    if (name == "PostgreSQL")
      return true
    else
      return false
   }
   
  async getRepositorie(id){

    const response = await this.rs.get_repositorie(this.id);
    this.repositorie = response['repositorie'];
    this.created_on = this.repositorie[0].created_on;
    this.categories = this.repositorie[0].categories;
    this.repo_name = this.repositorie[0].name;
    this.repo_abstract = this.repositorie[0].abstract;
    this.repo_id = this.repositorie[0].repo_id;
    this.maintainer = this.repositorie[0].maintainer;
    this.services = this.repositorie[0].services;
  } 

  async getMembers(id){
    const response = await this.rs.get_members_repositorie(this.id, this.user['user']['access_token']);
    this.users = response[0]['users'];
    this.user_email = this.users[0].email;
  }

}

export interface User {
  email: string;
  username: string;
  uri: string;
  last_login: string;
  created_on: string;
  full_name: string;
  image:  string;
}

export interface Dataset {
  dataset_id: number;
  authors: Array < string >;
  name: string;
  year: number;
}

export interface Repositorie {
  maintainer: string;
  name: string;
  abstract: string;
  categories: string[];
  repo_is: number;
  created_on: string;
  services: any[];
}