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

  showMsg: boolean = false;
 
  public name: string = "";
  public description: string = "";
  public maintainer: string = "";
  public language: string = "";
  public image: string = "";

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

  public imageModelChange(str: string): void {
    this.image = str;
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
        Validators.minLength(6),
        Validators.maxLength(34)
      ]),

      Description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ]),

      Maintainer: new FormControl('', [
        Validators.required,
        Validators.maxLength(355)
      ]),

      Image: new FormControl('', [
        Validators.required,
        Validators.maxLength(355)
      ]),

      Language: new FormControl('', [
        Validators.required,
        Validators.maxLength(355)
      ]),
    })
  }
  
  logged_user: User[];

  users: User[] = []

  users_no_logged: User[] = []

  users_selected: User[] = []

  async getUsers(){
    const response = await this.gs.get_users();
    this.users = response;
    this.users_no_logged = this.users.filter(x => (x.user_id != this.user['user']['user_id']));
    this.logged_user = this.users.filter(x => (x.user_id == this.user['user']['user_id']));
    this.users_selected = this.logged_user;
  }
  
  isUser(id: number){
    if (id == this.user['user']['user_id'])
      return false
    else
      return true
  }

  private async onSubmit() {
    try {
      const response = await this.gs.create_group(this.user['user']['access_token'], this.name, this.description, this.image, this.maintainer, this.language, this.users_selected, this.todayISOString, this.user['user']['ckan_api_key'] );
      if (response) {
        console.log(response)
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

  AddUsers(selectedUsers: Array < User >) {

    for (let index = 0; index < selectedUsers.length; index++) {
      if(this.users_selected.includes(selectedUsers[index]) == false)
        this.users_selected.push(selectedUsers[index]);
    }

  }

  removeUser(remove_id: number){
    this.users_selected = this.users_selected.filter(x => (x.user_id != remove_id))
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