import { Component, OnInit } from '@angular/core';
import * as fromLogin from '../../pages/login/login.reducer';
import { Store, select } from '@ngrx/store';
import { rmvUserData } from 'src/app/pages/login/login.action';
import { Router } from '@angular/router';

let logged = false;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private store: Store<fromLogin.AppState>,
    private router: Router,
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

  isLogged(){
    if(this.user)
      return true;
    else
      return false
  }
  
  logout(){
    this.store.dispatch(rmvUserData(null))
    this.router.navigate([`/`]);
  }

}
