import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { GroupsService } from '../groups/groups.service';
import { RepositorieService } from '../myrepositories/repositories.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-newrepositorie',
  templateUrl: './newrepositorie.component.html',
  styleUrls: ['./newrepositorie.component.scss']
})
export class NewrepositorieComponent implements OnInit {

  formGroup: FormGroup;

  showMsg: boolean = false;
 
  public name: string = "";
  public description: string = "";
  public collaborators: number = null;
  public maintainer: string = "";
  public categorie: number = null;
  public keywords: string = "";
  public postgres: boolean = true;
  public geoserver: boolean = true;
  public geonetwork: boolean = true;
  public terrama2: boolean = true;
  public owncloud: boolean = true;

  public nameModelChange(str: string): void {
    this.name = str;
  }

  public descriptionModelChange(str: string): void {
    this.description = str;
  }

  public collaboratorsModelChange(num: number): void {
    this.collaborators = num;
  }

  public maintainerModelChange(str: string): void {
    this.maintainer = str;
  }

  public categorieModelChange(num: number): void {
    this.categorie = num;
  }

  public keywordsModelChange(str: string): void {
    this.keywords = str;
  }

  public postgresModelChange(bol: boolean): void {
    this.postgres = bol;
  }

  public geoserverModelChange(bol: boolean): void {
    this.geoserver = bol;
  }

  public geonetworkModelChange(bol: boolean): void {
    this.geonetwork = bol;
  }

  public terrama2ModelChange(bol: boolean): void {
    this.terrama2 = bol;
  }
  
  public owncloudModelChange(bol: boolean): void {
    this.owncloud = bol;
  }

  constructor(private gs:GroupsService, private rs:RepositorieService, private store: Store<fromLogin.AppState>) {
    this.store.pipe(select('login')).subscribe(res => {
      if(res){
        this.user = res;
      }
    })
  }

  public user: any = null;
  todayISOString : string = new Date().toISOString();

  ngOnInit() {
    this.getGroups();
    this.getCategories();

    this.formGroup = new FormGroup({

      Name: new FormControl('', [
        Validators.required
      ]),

      Description: new FormControl('', [
        Validators.required
      ]),

      Collaborators: new FormControl('', [
        Validators.required
      ]),

      Maintainer: new FormControl('', [
        Validators.required
      ]),

      Categorie: new FormControl('', [
        Validators.required
      ]),

      Keywords: new FormControl('', [
        Validators.required
      ]),

      PostgreSQL: new FormControl('', [
      ]),

      GeoServer: new FormControl('', [
      ]),

      GeoNetwork: new FormControl('', [
      ]),

      TerraMA2: new FormControl('', [
      ]),      

      OwnCloud: new FormControl('', [
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

  private async onSubmit() {
    try {
      const response = await this.rs.repositorie_create(this.user['user']['access_token'], this.name, this.description, this.collaborators, this.maintainer, this.categorie, this.keywords, this.postgres, this.geoserver, this.geonetwork, this.terrama2, this.owncloud, this.todayISOString );
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

}

export interface Group {
  group_id: number;
  name: string;
}

export interface Categorie {
  categorie_id: number;
  name: string;
}