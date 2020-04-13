import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { LoginService } from './login.service';
import { Store } from '@ngrx/store';
import { addUserData } from './login.action';
import * as fromLogin from './login.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  
  public username: string = "";
  public password: string = "";
  showMsg: boolean = false;

  public usernameModelChange(str: string): void {
    this.username = str;
  }

  public passwordModelChange(str: string): void {
    this.password = str;
  }
  constructor(
    private ls: LoginService,
    private store: Store<fromLogin.AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      
      Username: new FormControl('', [
        Validators.required
      ]),

      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])

    });
  }

  private async onSubmit() {
    try {
      const response = await this.ls.user_login(this.username, this.password);
      if (response['access_token']) {
        this.store.dispatch(addUserData({
          user: response
        }))
        this.formGroup.reset(); 
        this.router.navigate([`/dashboard`]);
      } else {
        this.formGroup.reset(); 
        this.showMsg = true;
      }
    } catch (err) {
      console.log(err)
    }
  }

  onReset() {
    this.formGroup.reset();
  }
}
