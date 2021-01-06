import { Component, Injectable, OnInit } from '@angular/core';
import { RepositorieService } from './repositories.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myrepositories',
  templateUrl: './myrepositories.component.html',
  styleUrls: ['./myrepositories.component.scss']
})

@Injectable({ providedIn: 'root' })
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

        this.getRepositorieFromUsers(this.user['user']['user_id']);
      }

      checkServiceStatus(id: number){
       return true;
       }

       print(){
        console.log()
       }

       async getRepositorieFromUsers(user_id: number){
        const response = await this.rs.get_repositorie_from_users(user_id);
        this.repositories = response['repositorie'];
       }

      repositories = [];

    }
