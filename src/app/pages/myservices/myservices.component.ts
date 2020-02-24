import { Component, OnInit } from '@angular/core';
import { RepositorieService } from '../myrepositories/repositories.service';

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss']
})
export class MyservicesComponent implements OnInit {

  services = [];

  repositorie = [];

  constructor( private rs:RepositorieService ) { }

  ngOnInit() {
    this.getRepositorie(3);
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