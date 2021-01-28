import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { GroupsService } from '../groups/groups.service';
import { RepositorieService } from '../myrepositories/repositories.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { DatasetsService } from '../datasets/datasets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newdataset',
  templateUrl: './newdataset.component.html',
  styleUrls: ['./newdataset.component.scss']
})
export class NewdatasetComponent implements OnInit {

  public file_url: string = ""

  formGroup: FormGroup;

  showMsg: boolean = false;
  showLink: boolean = false;
  showUpload: boolean = true;

  public title: string = "";
  public description: string = "";
  public tags: string = "";
  public license: string = "cc-by";
  public collaborators: string = null;
  public visibility: boolean = false;
  public maintainer: string = "";
  public authoremail: string = "";
  public repo_id: number = null;
  public repo_name: string = "";
  public year: number = null;
  public key1: string = null;
  public value1: string = null;
  public key2: string = null;
  public value2: string = null;
  public key3: string = null;
  public value3: string = null;
  public dataname: string = null;
  public datadescription: string = null;
  public dataformat: string = null;
  public repo_ckan_id: string = null;

  getDataURL(event) {
    this.file_url = event;
  }

  public titleModelChange(str: string): void {
    this.title = str;
  }

  public descriptionModelChange(str: string): void {
    this.description = str;
  }

  public yearModelChange(num: number): void {
    this.year = num;
  }

  public tagsModelChange(str: string): void {
    this.tags = str;
  }

  public licenseModelChange(str: string): void {
    this.license = str;
  }

  public collaboratorsModelChange(str: string): void {
    this.collaborators = str;
  }

  public visibilityModelChange(bol: boolean): void {
    this.visibility = bol;
  }

  public maintainerModelChange(str: string): void {
    this.maintainer = str;
  }

  public authorEmailModelChange(str: string): void {
    this.authoremail = str;
  }

  public repositoryModelChange(num: number): void {
    this.repo_id = num;
    if (this.repo_id != null)
      this.getRepositorie(this.repo_id);
  }

  public key1ModelChange(str: string): void {
    this.key1 = str;
  }

  public value1ModelChange(str: string): void {
    this.value1 = str;
  }

  public key2ModelChange(str: string): void {
    this.key2 = str;
  }

  public value2ModelChange(str: string): void {
    this.value2 = str;
  }

  public key3ModelChange(str: string): void {
    this.key3 = str;
  }

  public value3ModelChange(str: string): void {
    this.value3 = str;
  }

  public urlModelChange(str: string): void {
    this.file_url = str;
  }

  public dataNameModelChange(str: string): void {
    this.dataname = str;
  }

  public dataDescriptionModelChange(str: string): void {
    this.datadescription = str;
  }

  public dataFormatModelChange(str: string): void {
    this.dataformat = str;
  }

  constructor(
    private gs:GroupsService,
    private rs:RepositorieService,
    private ds: DatasetsService,
    private router:Router,
    private store: Store<fromLogin.AppState>) {
    this.store.pipe(select('login')).subscribe(res => {
      if(res){
        this.user = res;
      }
    })
  }

  public user: any = null;
  todayISOString : string = new Date().toISOString();

  ngOnInit() {

    if(!this.user['user']){
      this.router.navigate(['/login']);
    }

    this.getLicense();
    this.getGroupsFromUser(this.user['user']['user_id']);
    this.getRepositoriesFromUser(this.user['user']['user_id']);

    this.formGroup = new FormGroup({

      Title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),

      Description: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000)
      ]),

      Tags: new FormControl('', [
        Validators.required
      ]),

      Collaborators: new FormControl('', [
        Validators.required
      ]),

      Year: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ]),

      Visibility: new FormControl('', [
      ]),

      Maintainer: new FormControl('', [
        Validators.required,
        Validators.maxLength(355)
      ]),

      AuthorEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),

      Repository: new FormControl('', [
        Validators.required
      ]),

      License: new FormControl('', [
        Validators.required
      ]),

      Key1: new FormControl('', [
      ]),

      Value1: new FormControl('', [
      ]),

      Key2: new FormControl('', [
      ]),

      Value2: new FormControl('', [
      ]),

      Key3: new FormControl('', [
      ]),

      Value3: new FormControl('', [
      ]),

      DataName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),

      DataDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000)
      ]),

      DataFormat: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
      ]),

      FileUrl: new FormControl('', [
      ]),

    });

  }

  async changeLink(){
    this.showLink = true;
    this.showUpload = false;
    this.file_url = "";
  }

  async changeUpload(){
    this.showLink = false;
    this.showUpload = true;
  }

  async getGroupsFromUser(user_id: number){
    const response = await this.gs.get_groups_from_user(user_id);
    if(response['groups']){
      this.groups = response['groups'];
    }
  }

  async getLicense(){
    const response = await this.ds.get_license_list();
    this.licences = response;
  }

  async getRepositorie(id: number){
    const response = await this.rs.get_repositorie(id);
    this.repo_name = response['repositorie'][0].path;
  }

  async getRepositoriesFromUser(user_id: number){
    const response = await this.rs.get_repositorie_from_users(user_id);
    this.repositories = response['repositorie'];
  }

  private async onSubmit() {

    try {
      const response = await this.ds.create_datasets(this.title, this.description, this.visibility, this.user['user']['full_name'], this.authoremail, this.maintainer, this.license, this.collaborators, 'r_'+this.repo_name, this.file_url, this.dataname, this.datadescription, this.dataformat, this.tags.split(','), this.key1, this.value1, this.key2, this.value2, this.key3, this.value3, this.year, this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''), this.user['user']['ckan_api_key'] );
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

  groups: Group[];
  licences: License[];
  repositories = [];

}

export interface Group {
  ckan_group_id: string;
  name: string;
}

export interface License {
  title: string;
  id: string;
}
