import { Component, OnInit } from '@angular/core';
import * as fromLogin from '../../pages/login/login.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

    constructor(
      private store: Store<fromLogin.AppState>,
    ) {
      this.store.pipe(select('login')).subscribe(res => {
        if(res){
          this.user = res['user']
        }
    })
  }

 public user: any;

  ngOnInit() {
  }
  
  OpenMenu() {
    if (document.getElementById("wrapper").className == "d-flex")
      document.getElementById("wrapper").className = "d-flex toggled";
    else  
      document.getElementById("wrapper").className = "d-flex";
  }

  isLogged(){
    if(this.user)
      return true;
    else
      return false
  }

}
