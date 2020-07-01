import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Clipboard } from 'ts-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsService } from '../groups/groups.service';
import { SignupService } from '../signup/signup.service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { DatasetsService } from '../datasets/datasets.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-mydatasets',
  templateUrl: './mydatasets.component.html',
  styleUrls: ['./mydatasets.component.scss']
})

export class MydatasetsComponent implements OnInit {

  DATASETS: RootObject[] = [];
  NEW_DATASETS: RootObject[] = [];
  groups: Group[];
  ckan_tags: string[];

  displayedColumns = ['dataset'];
  dataSource = new MatTableDataSource<RootObject>(this.NEW_DATASETS);
  size = this.NEW_DATASETS.length;
  filterYear = {}
  filterCategory = {}
  filterRepository = {}
  filterFiletypes = {}

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  form: FormGroup;

   /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */

   checkOpen(id: number){
    // if (id == 2){
    //     return false;
    // } else {
    //   return true;
    // }
   return true;
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   years = [];

   categories = [];

   repositories = [];

   filetypes = [];

   tipos = [];

   favorites = [
   ];

   filterChange() {

    this.dataSource.data = this.NEW_DATASETS;
    this.size = this.dataSource.data.length;

    for (let i = 0; i < this.years.length; i++) {
      if (this.filterYear[this.years[i].name] != false) {
        this.dataSource.data = this.dataSource.data.filter(x => (x.extras.filter(y => (y.key == 'Year'))[0].value == this.years[i].name ) )
        this.size = this.dataSource.data.length;
      } else {
      }
    }

    for (let i = 0; i < this.categories.length; i++) {
        if (this.filterCategory[this.categories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.tags.filter(t => (t.name == this.categories[i].name))).length);
            this.size = this.dataSource.data.length;
        } else {
        }
      }

    for (let i = 0; i < this.repositories.length; i++) {
        if (this.filterRepository[this.repositories[i].name] != false) {
          this.dataSource.data = this.dataSource.data.filter(x => (x.groups.filter(g => (g.title == this.repositories[i].name))).length);
            this.size = this.dataSource.data.length;
        } else {
        }
      }

    for (let i = 0; i < this.filetypes.length; i++) {
        if (this.filterFiletypes[this.filetypes[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.resources.filter (r => (r.format == this.filetypes[i].name))).length);
            this.size = this.dataSource.data.length;
        } else  {
        }
      }
}

   constructor(
     private formBuilder: FormBuilder,
     private snackBar: MatSnackBar,
     public dialog: MatDialog,
     private ds: DatasetsService,
     private ss: SignupService,
     private gs: GroupsService,
     private store: Store<fromLogin.AppState>,
     ) {
       this.store.pipe(select('login')).subscribe(res => {
         if(res){
           this.user = res;
         }
     })

    this.form = this.formBuilder.group({
      years: new FormArray([]),
      categories: new FormArray([]),
      repositories: new FormArray([]),
      filetypes: new FormArray([]),
    });

  }

  public user: any = null;

  ngOnInit() {

    document.getElementById("wrapper").className = "d-flex toggled";

    this.getDatasets();
    this.getGroups();
    this.get_users_ckan();;
    this.get_ckan_tags();
  }

  private addCheckboxes() {

    this.categories.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to "MIT", else false
      (this.form.controls.categories as FormArray).push(control);
    });

    this.years.map((o, k) => {
      const control = new FormControl(k === 0); // if first item set to "MIT", else false
      (this.form.controls.years as FormArray).push(control);
    });

    this.repositories.map((o, l) => {
      const control = new FormControl(l === 0); // if first item set to true, else false
      (this.form.controls.repositories as FormArray).push(control);
    });

    this.filetypes.map((o, m) => {
      const control = new FormControl(m === 0); // if first item set to true, else false
      (this.form.controls.filetypes as FormArray).push(control);
    });
  }

  checkFalse(){

    this.addCheckboxes();

    this.years.forEach(obj => {
      this.filterYear[obj.name] = false
    })

    this.categories.forEach(obj => {
      this.filterCategory[obj.name] = false
    })

    this.repositories.forEach(obj => {
      this.filterRepository[obj.name] = false
    })

    this.filetypes.forEach(obj => {
      this.filterFiletypes[obj.name] = false
    });

  }

  formatDate(date) {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oc", "Nov", "Dec"];

    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (day.length < 2)
        day = '0' + day;

    return [day, monthNames[month], year].join(' ');
  }

  formatDateYear(date) {
    var d = new Date(date),
        year = d.getFullYear();
    return year;
  }

  async get_users_ckan(){
    const response = await this.ss.get_users_ckan();
    this.ckan_users = response['result'];
  }

  async get_ckan_tags(){
    const response = await this.ds.get_ckan_tags();
    this.ckan_tags = response['result'];

  }

  groupsMembers = [];

  async getGroupsMembers(id: string, name: string){
    const response = await this.ss.get_members(id);
    this.groupsMembers = [];
    for (let index = 0; index < response['result'].length; index++) {
      this.groupsMembers.push({'group_name': name, 'id': response['result'][index][0], 'name': this.ckan_users.filter(x => (x.id == response['result'][index][0]))[0]['display_name']})
    }
  }

  removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {
      var key = keyFn(x), isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }

  async getDatasets(){
    const response = await this.ds.get_ckan_datasets();
    this.DATASETS = response['result']['results'];
    this.dataSource.data = this.DATASETS;
    this.size = this.DATASETS.length;

    for (let i = 0; i < this.DATASETS.length; i++) {

      await this.getGroupsMembers(this.DATASETS[i].groups[0].id, this.DATASETS[i].groups[0].title);

      this.DATASETS[i].authors = this.groupsMembers.filter(x => (x.group_name == this.DATASETS[i].groups[0].title));

      for (let index = 0; index < this.DATASETS[i].resources.length; index++) {
        this.filetypes.push({"id": (i*10)+index, "name": this.DATASETS[i].resources[index].format})
      }
      for (let index = 0; index < this.DATASETS[i].extras.length; index++) {
        if(this.DATASETS[i].extras[index].key == 'Year')
          this.years.push({"id": i, "name": this.DATASETS[i].extras[index].value })
      }
    }

    this.years = this.removeDuplicatesBy(x => x.name, this.years);
    this.filetypes = this.removeDuplicatesBy(x => x.name, this.filetypes);

    for (let index = 0; index < this.ckan_tags.length; index++) {
      this.categories.push({"id": index, "name": this.ckan_tags[index]})
    }

    this.checkFalse();
  }


  async getGroups(){

    const response = await this.gs.get_groups();
    this.groups = response;

    var lookup = {};
    var count = 0;

    for (let i = 0; i < this.groups.length; i++) {
      var name = this.groups[i].name;

      if (!(name in lookup)) {
        lookup[name] = 1;
        count = count + 1;
        this.repositories.push({"id": count, "name":  this.groups[i].name})
        }
      }

  }

  get_year(id: string){
    let selected_dataset = this.DATASETS.filter(x => (x.id == id))[0]
    for (let index = 0; index < selected_dataset['extras'].length; index++) {
      if(selected_dataset['extras'][index].key == 'Year')
        return selected_dataset['extras'][index].value
    }
  }

  ckan_users = [];
}

export interface Resource {
  mimetype: any;
  cache_url: any;
  hash: string;
  description: string;
  name: string;
  format: string;
  url: string;
  cache_last_updated: any;
  package_id: string;
  created: Date;
  state: string;
  mimetype_inner: any;
  last_modified: any;
  position: number;
  url_type: any;
  id: string;
  resource_type: any;
  size: any;
}

export interface Tag {
  vocabulary_id: any;
  state: string;
  display_name: string;
  id: string;
  name: string;
}

export interface Group {
  display_name: string;
  description: string;
  image_display_url: string;
  title: string;
  id: string;
  name: string;
}

export interface Organization {
  description: string;
  created: Date;
  title: string;
  name: string;
  is_organization: boolean;
  state: string;
  image_url: string;
  type: string;
  id: string;
  approval_status: string;
}

export interface Extra {
  key: string;
  value: string;
}

export interface RootObject {
  license_title: string;
  maintainer: string;
  relationships_as_object: any[];
  private: boolean;
  maintainer_email: any;
  num_tags: number;
  id: string;
  metadata_created: Date;
  metadata_modified: Date;
  author: string;
  author_email: string;
  state: string;
  version: any;
  creator_user_id: string;
  type: string;
  resources: Resource[];
  num_resources: number;
  tags: Tag[];
  groups: Group[];
  license_id: string;
  relationships_as_subject: any[];
  organization: Organization;
  name: string;
  isopen: boolean;
  url: any;
  notes: string;
  owner_org: string;
  extras: Extra[];
  license_url: string;
  title: string;
  authors: authors[];
}

export interface authors {
  name: string;
  group_name: string;
  id: string;
}
