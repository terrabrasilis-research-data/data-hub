import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositorieService } from '../myrepositories/repositories.service';

@Component({
  selector: 'app-repositorie',
  templateUrl: './repositorie.component.html',
  styleUrls: ['./repositorie.component.scss']
})

export class RepositorieComponent implements OnInit, OnDestroy  {
  id: number;
  private sub: any;

  users: User[] = [
    {"email": "email@email.com", "username": "username_1", "uri": "http://127.0.0.1:5000/api/v1.0/users/1", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Krahl, Guilherme", "image": "assets/images/img_avatar.png"}, 
    {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Jairo Francisco", "image": "assets/images/img_avatar2.png"},
    {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Cornils, Astrid", "image": "assets/images/img_avatar2.png"}

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

  constructor(private route: ActivatedRoute, private rs:RepositorieService) { }
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
    });
    this.getRepositorie(this.id);
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

  async getRepositorie(id){
    const response = await this.rs.get_repositorie(this.id);
    this.repositorie = response['repositorie'];
  }

  repositorie = []

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