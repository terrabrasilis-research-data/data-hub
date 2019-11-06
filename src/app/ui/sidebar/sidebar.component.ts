import { Component, OnInit } from '@angular/core';

let logged = true;

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
    return logged;
  }

}
