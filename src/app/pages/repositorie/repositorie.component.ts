import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repositorie',
  templateUrl: './repositorie.component.html',
  styleUrls: ['./repositorie.component.scss']
})

export class RepositorieComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       //let reposorie = this.reposorie;
       //let user = this.user;
       //let service = this.service;
       //let keywords = this.keywords;
       //let categories =  this.categories;

       // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
  address: string;
  created_on: string;
  name: string;
  ports: Array < string >;
}

export interface User {
  email: string;
  username: string;
  uri: string ;
  last_login: string;
  created_on: string;
  full_name: string;
  image:  string;
}

const services: Service[] = [
  {"address": "172.17.01", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "PostgreSQL", "ports": ["5432"]}, 
  {"address": "172.17.02", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "GeoServer", "ports": ["5555", "5050"]}, 
  {"address": "172.17.03", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "name": "GeoNetwork", "ports": ["5000"]}
]

const users: User[] = [
  {"email": "email@email.com", "username": "username_1", "uri": "http://127.0.0.1:5000/api/v1.0/users/1", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "username_full_name", "image": "assets/images/img_avatar.png"}, 
  {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "username2_full_name", "image": "assets/images/img_avatar2.png"}
]

const categories: string[] = [
  "Sensoriamento Remoto"
]

const keywords: string[] = [
  "Sistemas Socioambientais", 
  "Atividade Antr\u00f3picas", 
  "Uso e Cobertura da Terra"
]

const repositorie: Repositorie[] = [
    {
      "custom_fields": [], 
      "repo_id": 1, 
      "abstract": "Teste", 
      "language": "Portugu\u00eas", 
      "name": "Teste", 
      "bbox": "{\"type\":\"Polygon\",\"coordinates\":[[[-70.0588433406,-33.3848757513],[-35.2541558406,-33.3848757513],[-35.2541558406,0.2315631899],[-70.0588433406,0.2315631899],[-70.0588433406,-33.3848757513]]]}", 
      "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", 
      "maintainer": "username"
    }
]
