import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { GroupsService } from '../groups/groups.service';
import { RepositorieService } from '../myrepositories/repositories.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { DatasetsService } from '../datasets/datasets.service';

@Component({
  selector: 'app-newdataset',
  templateUrl: './newdataset.component.html',
  styleUrls: ['./newdataset.component.scss']
})
export class NewdatasetComponent implements OnInit {

  formGroup: FormGroup;

  showMsg: boolean = false;
 
  public title: string = "";
  public description: string = "";
  public tags: string = "";
  public license: string = "cc-by";
  public collaborators: string = "";
  public visibility: boolean = false;
  public maintainer: string = "";
  public authoremail: string = "";
  public repository: string = "";
  public boundbox: string = "";
  public categorie: number = null;
  public key1: string = null;
  public value1: string = null;
  public key2: string = null;
  public value2: string = null;
  public key3: string = null;
  public value3: string = null;
  public dataurl: string = null;
  public dataname: string = null;
  public datadescription: string = null;
  public dataformat: string = null;

  public titleModelChange(str: string): void {
    this.title = str;
  }

  public descriptionModelChange(str: string): void {
    this.description = str;
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

  public repositoryModelChange(str: string): void {
    this.repository = str;
  }

  public boundboxModelChange(str: string): void {
    this.boundbox = str;
  }

  public categorieModelChange(num: number): void {
    this.categorie = num;
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
    this.dataurl = str;
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

  constructor(private gs:GroupsService, private rs:RepositorieService, private ds: DatasetsService, private store: Store<fromLogin.AppState>) {
    this.store.pipe(select('login')).subscribe(res => {
      if(res){
        this.user = res;
      }
    })
  }

  public user: any = null;
  todayISOString : string = new Date().toISOString();

  ngOnInit() {
    this.getLicense();
    this.getGroups();
    this.getCategories();
    this.getRepositories();

    this.formGroup = new FormGroup({

      Title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern("^[a-z0-9_]*$")
      ]),

      Description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ]),

      Tags: new FormControl('', [
        Validators.required
      ]),

      Collaborators: new FormControl('', [
        Validators.required
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

      BoundBox: new FormControl('', [
        Validators.required
      ]),

      Categorie: new FormControl('', [
        Validators.required
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

      DataURL: new FormControl('', [
        Validators.required
      ]),

      DataName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern("^[a-z0-9_]*$")
      ]),

      DataDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ]),

      DataFormat: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
      ]),

    });

  }

  async getGroups(){
    const response = await this.gs.get_groups();
    this.groups = response;
  }

  async getCategories(){
    const response = await this.gs.get_categories();
    this.categories = response;
  }
  
  async getLicense(){
    const response = await this.ds.get_license_list();
    this.licences = response;
  }
  
  async getRepositories(){
    const response = await this.rs.get_repositories();
    this.repositories = response['repositorie'];
  }

  private async onSubmit() {
    try {
      const response = await this.ds.create_datasets(this.title, this.description, this.visibility, this.user['user']['full_name'], this.authoremail, this.maintainer, this.license, this.collaborators, this.repository, this.dataurl, this.dataname, this.datadescription, this.dataformat, this.user['user']['ckan_api_key'] );
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
  categories: Categorie[];
  licences: License[];
  repositories = [];

}

export interface Group {
  ckan_group_id: string;
  name: string;
}

export interface Categorie {
  categorie_id: number;
  name: string;
}

export interface License {
  title: string;
  id: string;
}