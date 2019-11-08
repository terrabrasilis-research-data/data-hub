import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss']
})
export class MyservicesComponent implements OnInit {

  services: Service[] = [
    {"id": 1, "address": "172.17.01", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "PostgreSQL", "ports": ["5432"]}, 
    {"id": 2, "address": "172.17.02", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "GeoServer", "ports": ["5555", "5050"]}, 
    {"id": 3, "address": "172.17.03", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "GeoNetwork", "ports": ["5000"]}
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

  constructor() { }

  ngOnInit() {
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