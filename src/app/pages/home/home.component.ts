import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from '../signup/signup.service';
import { DatasetsService } from '../datasets/datasets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
 {

  public query: string = "";

  public searchBoxModelChange(str: string): void {
    this.query = str;
  }

  constructor(
    private snackBar: MatSnackBar,
    private ss: SignupService,
    private router:Router,
    private ds: DatasetsService,) { }

  ngOnInit() {
    document.getElementById("wrapper").className = "d-flex toggled";
    this.getDatasets();
    this.get_users_ckan();
  }

  removeNewlines(str: string) {
    //remove line breaks from str
    str = str.replace(/\s{2,}/g, '');
    str = str.replace(/\t/g, '');
    str = str.toString().trim().replace(/(\r\n|\n|\r)/g,"");
    str = str.replace(" ", "")
    return str
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.query = this.removeNewlines(this.query);
      this.router.navigate(['/search/'+this.query]);
    }
  }

  formatName(name: string){
    let name_list = name.split(" ")
    return name_list[0]+" "+name_list[name_list.length - 1]
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

  async getDatasets(){
    const response = await this.ds.get_ckan_datasets();
    this.DATASETS = response['result']['results'];

    for (let i = 0; i < this.DATASETS.length; i++) {

      await this.getGroupsMembers(this.DATASETS[i].groups[0].id, this.DATASETS[i].groups[0].title);

      this.DATASETS[i].authors = this.groupsMembers.filter(x => (x.group_name == this.DATASETS[i].groups[0].title));

    }
  }

  async get_users_ckan(){
    const response = await this.ss.get_users_ckan();
    this.ckan_users = response['result'];
  }

  groupsMembers = [];

  async getGroupsMembers(id: string, name: string){
    const response = await this.ss.get_members(id);
    this.groupsMembers = [];
    for (let index = 0; index < response['result'].length; index++) {
      this.groupsMembers.push({'group_name': name, 'id': response['result'][index][0], 'name': this.ckan_users.filter(x => (x.id == response['result'][index][0]))[0]['display_name']})
    }
  }

  ckan_users = [];

  DATASETS: RootObject[] = [];


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
