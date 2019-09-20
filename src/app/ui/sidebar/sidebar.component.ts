import { Component, OnInit } from '@angular/core';

let logged;

if (localStorage.getItem('Auth')){
  logged = JSON.parse(localStorage.getItem('Auth')); 
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ChangeLogged(results: boolean){
    var value = results;
    localStorage.setItem('Auth', JSON.stringify(value));
  }

  isLogged(){
    logged = JSON.parse(localStorage.getItem('Auth')); 
    return logged;
  }

}
