import { Component, OnInit } from '@angular/core';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { GroupsService } from '../groups/groups.service';
import { SignupService } from '../signup/signup.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  formGroup: FormGroup;

  showMsg: boolean = false;
  showErrorMsg: boolean = false;
 
  public file_name: string = ""

  public change_password: boolean = false;

  public username: string = "";
  public email: string = "";
  public oldpassword: string = "";
  public newpassword: string = "";
  public fullname: string = "";
  public created_on: string = "";
  public last_login: string = "";
  public user_info: User;
  public password: string;

  todayISOString : string = new Date().toISOString();

  getName(event) {
    this.file_name = event;
    console.log(this.file_name)
  }

  public usernameModelChange(str: string): void {
    this.username = str;
  }

  public emailModelChange(str: string): void {
    this.email = str;
  }

  public oldpasswordModelChange(str: string): void {
    this.oldpassword = str;
  }
  
  public newpasswordModelChange(str: string): void {
    this.newpassword = str;
  }

  public fullnameModelChange(str: string): void {
    this.fullname = str;
  }

  constructor(
    private router:Router,
    private store: Store<fromLogin.AppState>,
    private gs:GroupsService, 
    private ss:SignupService
    ) {
    this.store.pipe(select('login')).subscribe(res => {
      if(res){
        this.user = res;
      }
    })
  }
  public user: any = null;

  ngOnInit() {

    if(!this.user['user']){
      this.router.navigate(['/login']);
    }

    this.formGroup = new FormGroup({

      Username: new FormControl('', [
        Validators.required
      ]),

      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),

      OldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),

      NewPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),

      ReNewPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),

      Fullname: new FormControl('', [
        Validators.required
      ]),

    });
    
    this.getUser(this.user['user']['user_id']);

  }

  change_pass(){
    if(!this.change_password)
      this.change_password = true;
    else
      this.change_password = false;

  }

  async getUser(user_id: number){
    const user_info = await this.gs.get_user(user_id);
    this.username = user_info.username
    this.email = user_info.email
    this.fullname = user_info.full_name
    this.created_on = user_info.created_on
    this.last_login = user_info.last_login
  }

  private async onSubmit() {
    try { 

      if(!this.change_password)
        this.password = this.newpassword
      else 
        this.password = this.oldpassword

      const response = await this.ss.user_update(this.user['user']['access_token'], this.user['user']['user_id'], this.username, this.email, this.password, this.fullname, this.created_on, this.last_login, this.file_name, this.user['user']['ckan_api_key']);
      
      if (response) {
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

export interface User {
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  image: string;
  created_on: string;
  last_login: string;
}