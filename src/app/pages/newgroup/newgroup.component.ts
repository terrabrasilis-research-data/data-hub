import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.scss']
})
export class NewgroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  users: User[] = [
    {"email": "email@email.com", "username": "JFrancisco", "uri": "http://127.0.0.1:5000/api/v1.0/users/1", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Krahl Guilherme", "image": "assets/images/img_avatar.png"}, 
    {"email": "email2@email2.com", "username": "CAstrid", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Jairo Francisco", "image": "assets/images/img_avatar2.png"},
    {"email": "email2@email2.com", "username": "KGuilherme", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Cornils Astrid", "image": "assets/images/img_avatar2.png"}

  ]

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