import { Component, OnInit } from '@angular/core';
import { RepositorieService } from '../myrepositories/repositories.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss']
})
export class MyservicesComponent implements OnInit {

  services = [];

  repositorie = [];

  path = "";

  constructor( 
    private rs:RepositorieService,
    private router: Router,
    private store: Store<fromLogin.AppState>,
    ) { this.store.pipe(select('login')).subscribe(res => {
      if(res){
        this.user = res;
      }
    })
  }

  public user: any = null;
  
  ngOnInit() {
         
    if(!this.user['user']){
      this.router.navigate(['/login']);
    }

    this.getRepositorie(1);
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

    const response = await this.rs.get_repositorie(id);
    this.repositorie = response['repositorie'];
    this.services = this.repositorie[0].services;
    this.path = this.repositorie[0]['path'];
  } 

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