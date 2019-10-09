import { Component, OnInit } from '@angular/core';

let logged = false;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLogged(){
    logged = JSON.parse(localStorage.getItem('Auth')); 
    return logged;
  }

}
