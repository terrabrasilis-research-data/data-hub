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

  repositories = [];

  paths = [];
  
  maintainer = [];

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

    this.getRepositorieFromUsers(this.user['user']['user_id']);
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
   
  async getRepositorieFromUsers(user_id: number){
    const response = await this.rs.get_repositorie_from_users(user_id);
    this.repositories = response['repositorie'];
    
    for (let i = 0; i < this.repositories.length; i++) {
      for (let j = 0; j < this.repositories[i]['services'].length; j++) {
        this.services.push(this.repositories[i]['services'][j])
        this.paths.push(this.repositories[i]['path'])
        this.maintainer.push(this.repositories[i]['maintainer'])
      }
    }
    
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