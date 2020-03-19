import { Component, OnInit } from '@angular/core';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { GroupsService } from '../groups/groups.service';
import { RepositorieService } from '../myrepositories/repositories.service';
import { SignupService } from '../signup/signup.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatasetsService } from '../datasets/datasets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  repo_id = 1;

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
  public repository: string = "";
  public dataurl: string = null;
  public dataname: string = null;
  public datadescription: string = null;
  public dataformat: string = null;

  path = "";
  
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
  
  constructor(
    private rs:RepositorieService,
    private gs:GroupsService,
    private ss:SignupService,
    private router:Router,
    private ds: DatasetsService,
    private store: Store<fromLogin.AppState>,
  ) {
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

    this.getGroups();
    this.getActivity();
    this.get_users_ckan();
    this.getRepositorie(3);
    this.getLicense();
    this.getGroups();
    this.getRepositories();
    document.getElementById("wrapper").className = "d-flex";
    
    this.formGroup = new FormGroup({

      Title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
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
        Validators.maxLength(8),
      ]),

    });
  }

  servicepath(name: string){
    if (name == "PostgreSQL")
      return true
    else
      return false
   }

  async changeLink(){
    this.showLink = true;
    this.showUpload = false;
  }

  async changeUpload(){
    this.showLink = false;
    this.showUpload = true;
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
      const response = await this.ds.create_datasets(this.title, this.description, this.visibility, this.user['user']['full_name'], this.authoremail, this.maintainer, this.license, this.collaborators, this.repository, this.dataurl, this.dataname, this.datadescription, this.dataformat, this.tags.split(','), "", "", "", "", "", "", this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''), this.user['user']['ckan_api_key'] );
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

  async getGroups(){
    const response = await this.gs.get_groups();
    this.groups = response;
  }

  async getActivity(){
    const response = await this.ss.get_activity(this.user['user']['ckan_api_key']);
    this.activities_list = response['result']
  }

  async get_users_ckan(){
    const response = await this.ss.get_users_ckan();
    this.ckan_users = response['result'];
  }

  getUser(id: string){
    return this.ckan_users.filter(x => (x.id == id))[0]['display_name'];    
  }

  getActivityName(type: string){
    if(this.activity_dict.filter(x => (x.ckan_activity_type == type)).length == 1)
      return this.activity_dict.filter(x => (x.ckan_activity_type == type))[0]['activity_string']
    else
      return type
  }

  groups: Group[]; 

  licences: License[];

  repositories = [];

  services = [];
  
  repositorie = [{}];
  
  organizations = [];

  activities_list = [];

  ckan_users = [];
  
  activity_dict = [
    {"ckan_activity_type": "new organization", "activity_string": "created a repository"},
    {"ckan_activity_type": "new user", "activity_string": "signed up"},
    {"ckan_activity_type": "new group", "activity_string": "created the group "},
    {"ckan_activity_type": "new package ", "activity_string": "created the dataset "},
    {"ckan_activity_type": "changed package", "activity_string": "changed a package"}
  ];

  datasets: Dataset[] = [
    {"dataset_id": 1, "name": "Radiocarbon ages and pollen record of Kongor Lake sediments", "authors": ["Krahl Guilherme", "Jairo Francisco","Cornils Astrid"], "year": 2019},
    {"dataset_id": 2, "name": "Multiple proxy data at DSDP Site 72-516F and ODP Hole 171-1049C during Dan-C2 and lower C29n", "authors": ["Jairo Francisco","Cornils Astrid"],"year": 2018},
    {"dataset_id": 3, "name": "Latest Maastrichtian dinocyst and benthic foraminiferal records of Bass River, Meirs Farm and Search Farm sediment cores, New Jersey, USA", "authors": ["Cornils Astrid"],"year": 2017},
    {"dataset_id": 4, "name": "Clumped isotope measurements of Mesozoic belemnites from southern high latitudes", "authors": ["Francisco Jairo","Cornils Astrid"],"year": 2016},
    {"dataset_id": 5, "name": "Sedimentary Fe speciation and Fe isotope compositions from SONNE cruise SO241", "authors": ["Guilherme Krahl", "Jairo Francisco","Cornils Astrid"],"year": 2015},
    {"dataset_id": 6, "name": "Organic and inorganic geochemical data of sediment cores XC-03 and XC-01-2, Xingu River, Amazon Basin", "authors": ["Cornils Astrid"],"year": 2014},
    {"dataset_id": 7, "name": "Tephra data of sediment cores of the Black Sea covering MIS 6 (184-130 ka BP)", "authors": ["Astrid Cornils"],"year": 2019},
    {"dataset_id": 8, "name": "High resolution in situ temperatures across coral reef slopes: Iriomote-jima, Japan and Gulf of Chiriquí, Panama", "authors": ["Guilherme Krahl", "Jairo Francisco","Cornils Astrid"],"year": 2016},   
  ]
  
  checkServiceStatus(id: number){
    return true;
   }

   async getRepositorie(id){

    const response = await this.rs.get_repositorie(id);
    this.repositorie = response['repositorie'];
    this.services = this.repositorie[0]['services'];
    this.path = this.repositorie[0]['path'];
  } 

}

export interface Activities {
  username: string;
  activity_type: string;
  package_name: string;
  package_id: string;
  timestamp: string;

}

export interface Service {
  id: number;
  address: string;
  created_on: string;
  name: string;
  ports: Array < string >;
}

export interface Dataset {
  dataset_id: number;
  authors: Array < string >;
  name: string;
  year: number;
}

export interface Group {
  ckan_group_id: string;
  name: string;
}

export interface License {
  title: string;
  id: string;
}