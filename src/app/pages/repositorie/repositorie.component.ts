import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  path = "";
  repo_abstract = "";
  repo_id = "";
  user_email = "";
  maintainer = "";
  services = [];

  users: User[];

  repositorie = [];

  datasets: Dataset[] = []

  constructor(
    private route: ActivatedRoute,
    private rs:RepositorieService,
    private router: Router,
    private store: Store<fromLogin.AppState>
    ) {
    this.store.pipe(select('login')).subscribe(res => {
    if(res){
      this.user = res;
    }
  }) }

  public user: any = null;

  ngOnInit() {

    if(!this.user['user']){
      this.router.navigate(['/login']);
    }

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
    this.path = this.repositorie[0].path;
    this.repo_abstract = this.repositorie[0].abstract;
    this.repo_id = this.repositorie[0].repo_id;
    this.maintainer = this.repositorie[0].maintainer;
    this.services = this.repositorie[0].services;
  }

  async getMembers(id){
    const response = await this.rs.get_members_repositorie(this.id, this.user['user']['access_token']);
    this.users = response['groups'][0]['users'];
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
