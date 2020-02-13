import { Component, OnInit } from '@angular/core';
import { RepositorieService } from '../myrepositories/repositories.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})

export class RepositoriesComponent implements OnInit {
    
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