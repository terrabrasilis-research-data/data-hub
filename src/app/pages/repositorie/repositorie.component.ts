import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repositorie',
  templateUrl: './repositorie.component.html',
  styleUrls: ['./repositorie.component.scss']
})

export class RepositorieComponent implements OnInit, OnDestroy  {
  id: number;
  private sub: any;

  services: Service[] = [
    {"id": 1, "address": "172.17.01", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "PostgreSQL", "ports": ["5432"]}, 
    {"id": 2, "address": "172.17.02", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "GeoServer", "ports": ["5555", "5050"]}, 
    {"id": 3, "address": "172.17.03", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "GeoNetwork", "ports": ["5000"]}
  ]

  users: User[] = [
    {"email": "email@email.com", "username": "username_1", "uri": "http://127.0.0.1:5000/api/v1.0/users/1", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Krahl, Guilherme", "image": "assets/images/img_avatar.png"}, 
    {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Jairo Francisco", "image": "assets/images/img_avatar2.png"},
    {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Cornils, Astrid", "image": "assets/images/img_avatar2.png"}

  ]
  
  categories: string[] = [
    "Sensoriamento Remoto"
  ]
  
  keywords: string[] = [
    "Sistemas Socioambientais", 
    "Atividade Antr\u00f3picas", 
    "Uso e Cobertura da Terra"
  ]
  
  datasets: Dataset[] = [
    {"dataset_id": 1, "name": "Radiocarbon ages and pollen record of Kongor Lake sediments", "year": 2019},
    {"dataset_id": 2, "name": "Multiple proxy data at DSDP Site 72-516F and ODP Hole 171-1049C during Dan-C2 and lower C29n", "year": 2018},
    {"dataset_id": 3, "name": "Latest Maastrichtian dinocyst and benthic foraminiferal records of Bass River, Meirs Farm and Search Farm sediment cores, New Jersey, USA", "year": 2017},
    {"dataset_id": 4, "name": "Clumped isotope measurements of Mesozoic belemnites from southern high latitudes", "year": 2016},
    {"dataset_id": 5, "name": "Sedimentary Fe speciation and Fe isotope compositions from SONNE cruise SO241", "year": 2015},
    {"dataset_id": 6, "name": "Organic and inorganic geochemical data of sediment cores XC-03 and XC-01-2, Xingu River, Amazon Basin", "year": 2014},
    {"dataset_id": 7, "name": "Tephra data of sediment cores of the Black Sea covering MIS 6 (184-130 ka BP)", "year": 2019},
    {"dataset_id": 8, "name": "High resolution in situ temperatures across coral reef slopes: Iriomote-jima, Japan and Gulf of Chiriquí, Panama", "year": 2016},   
  ]

  repositorie: Repositorie[] = [
      {
        "custom_fields": [], 
        "repo_id": 1, 
        "abstract": "During several expeditions to the Southern Ocean from 1982 to 2005 the gonad maturity of selected calanoid copepods was determined to elucidate the life-cycle strategies of the different species. Five different developmental stages of ovaries (unripe, semi-ripe, ripe, semi-spent, spent) were separated according to Runge (1985) and Corkett and McLaren (1979). The stage „semi-spent“ was only investigated in few species and expeditions. In this stages the spent oviduct still contains a few eggs in some unwarranted rows.", 
        "language": "Portugu\u00eas", 
        "name": "Hydrogen Repository", 
        "bbox": "{\"type\":\"Polygon\",\"coordinates\":[[[-70.0588433406,-33.3848757513],[-35.2541558406,-33.3848757513],[-35.2541558406,0.2315631899],[-70.0588433406,0.2315631899],[-70.0588433406,-33.3848757513]]]}", 
        "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", 
        "maintainer": "username"
      }
  ]

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
    });
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
}

export interface Repositorie{
  custom_fields: Array < string >;
  repo_id: number;
  abstract: string;
  language: string;
  name: string;
  bbox: string;
  created_on: string;
  maintainer: string;
}

export interface Service {
  id: number;
  address: string;
  created_on: string;
  name: string;
  ports: Array < string >;
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
  name: string;
  year: number;
}