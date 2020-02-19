import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { GroupsService } from '../groups/groups.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.component.html',
  styleUrls: ['./newgroup.component.scss']
})
export class NewgroupComponent implements OnInit {

  formGroup: FormGroup;

  formPeople: FormGroup;

  showMsg: boolean = false;
 
  public name: string = "";
  public description: string = "";
  public maintainer: string = "";
  public language: string = "";

  public nameModelChange(str: string): void {
    this.name = str;
  }

  public descriptionModelChange(str: string): void {
    this.description = str;
  }

  public maintainerModelChange(str: string): void {
    this.maintainer = str;
  }

  public languageModelChange(str: string): void {
    this.language = str;
  }
  
  constructor(private gs:GroupsService, private store: Store<fromLogin.AppState>) { this.store.pipe(select('login')).subscribe(res => {
    if(res){
      this.user = res;
    }
  })
  
}

  public user: any = null;
  todayISOString : string = new Date().toISOString();

  ngOnInit() {
    
    this.getUsers();

    this.formGroup = new FormGroup({

      Name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(34),
        Validators.pattern("^[a-z0-9_]*$")
      ]),

      Description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ]),

      Maintainer: new FormControl('', [
        Validators.required,
        Validators.maxLength(355)
      ]),

      Language: new FormControl('', [
        Validators.required,
        Validators.maxLength(355)
      ]),
    })
  }
  
  logged_user: CKAN_User[];

  users: CKAN_User[] = []

  users_no_logged: CKAN_User[] = []

  users_selected: CKAN_User[] = []

  userdb: User[] = []

  async getUsers(){
    const responsedb = await this.gs.get_users_db();
    this.userdb = responsedb.filter(x => (x.user_id > 10));
    const response = await this.gs.get_users();
    this.users = response['result'].filter(x => (x.sysadmin == false));
    for (let index = 0; index < this.users.length; index++) {
      let indexUser = this.userdb.filter(x => (x.full_name == this.users[index].fullname));
      this.users[index].user_id = indexUser[0].user_id;
      this.users[index].image = indexUser[0].image;
    }
    this.users_no_logged = this.users.filter(x => (x.fullname != this.user['user']['full_name']));
    this.logged_user = this.users.filter(x => (x.fullname == this.user['user']['full_name']));
    this.users_selected = this.logged_user;
  }
  
  isUser(fullname: string){
    if (fullname == this.user['user']['full_name'])
      return false
    else
      return true
  }

  private async onSubmit() {
    try {
      console.log(this.users_selected)
      const response = await this.gs.create_group(this.user['user']['access_token'], this.name, this.description, '', this.maintainer, this.language, this.users_selected, this.todayISOString, this.user['user']['ckan_api_key'] );
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

  AddUsers(selectedUsers: Array < CKAN_User >) {

    for (let index = 0; index < selectedUsers.length; index++) {
      if(this.users_selected.includes(selectedUsers[index]) == false)
        this.users_selected.push(selectedUsers[index]);
    }
    this.formPeople.reset();

  }

  removeUser(remove_id: string){
    this.users_selected = this.users_selected.filter(x => (x.id != remove_id))
    this.formPeople.reset();
  }

  checkuserStatus(status: string){
    if (status == 'active')
      return true
    else
      return false
  }
}

export interface User {
  user_id: number;
  email: string;
  username: string;
  uri: string;
  last_login: string;
  created_on: string;
  full_name: string;
  image:  string;
}

export interface CKAN_User {
  email_hash: string;
  apikey: string;
  display_name: string;
  created: string;
  id: string;
  sysadmin: boolean;
  activity_streams_email_notifications: boolean;
  state: string;
  fullname: string;
  email: string;
  number_created_packages: number;
  user_id: number;
  image:  string;
}