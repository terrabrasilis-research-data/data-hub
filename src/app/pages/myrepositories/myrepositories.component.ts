import { Component, OnInit } from '@angular/core';
import { RepositorieService } from './repositories.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myrepositories',
  templateUrl: './myrepositories.component.html',
  styleUrls: ['./myrepositories.component.scss']
})

export class MyrepositoriesComponent implements OnInit {
    
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

        this.getRepositories();
      }
    
      checkServiceStatus(id: number){
       return true;
       }

       print(){
        console.log()
       }

       async getRepositories(){
        const response = await this.rs.get_repositories();
        this.repositories = response['repositorie'];
      }

      repositories = [];

    }