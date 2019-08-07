import { Component } from '@angular/core';

let logged = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'terrabrasilis-research-data';
  user = {'name':"Gabriel"};
  OpenMenu() {
    if (document.getElementById("wrapper").className == "d-flex")
      document.getElementById("wrapper").className = "d-flex toggled";
    else  
      document.getElementById("wrapper").className = "d-flex";
  }

  ChangeLogged(results: boolean){
    logged = results;
  }

  isLogged(){
    return logged;
  }
}