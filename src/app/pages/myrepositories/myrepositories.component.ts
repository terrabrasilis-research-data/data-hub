import { Component, OnInit } from '@angular/core';
import { RepositorieService } from './repositories.service';

@Component({
  selector: 'app-myrepositories',
  templateUrl: './myrepositories.component.html',
  styleUrls: ['./myrepositories.component.scss']
})

export class MyrepositoriesComponent implements OnInit {
    
      constructor(private rs:RepositorieService) { }
    
      ngOnInit() {
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