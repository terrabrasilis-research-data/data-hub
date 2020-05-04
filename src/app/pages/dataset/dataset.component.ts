import { Component, OnInit, OnDestroy, Input, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer, Layer, geoJSON } from 'leaflet';
import { CommentNode } from 'src/app/pages/dataset/comments/comment-tree.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from 'ts-clipboard';
import { DatasetsService } from '../datasets/datasets.service';
import { SignupService } from '../signup/signup.service';
import { GroupsService } from '../groups/groups.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})

export class DatasetComponent implements OnInit, OnDestroy, LeafletModule {
  
  public layersControl: any;

  @Input()
  comments:CommentNode[] = [];
  text:string;
  
  addComment(comment:CommentNode){
    this.comments.push(new CommentNode(this.text))
    this.text="";    
  }

	options = {
  };
  
  id: string;
  id_proc = "";
  private sub: any;

  metadata_created: Date;
  tag = "";
  tags = [];
  title = "";
  month = null;
  url = "";
  purl = "http://purl.dpi.inpe.br/tbrd/H5JT7";
  users = [];
  abstract = [];
  resources = [];
  license = "";
  author_email = "";
  maintainer = "";
  bib_author = "";
  extra = [];
  other_datasets = [];
  resource_url = "";
  year = null;
  tags_list = [];

  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    private ss: SignupService,
    private snackBar: MatSnackBar,
    private ds: DatasetsService,
    private gs: GroupsService,
  ) {}

  
  ngOnInit() {

    document.getElementById("wrapper").className = "d-flex toggled";
    
    this.layersControl = {
      baseLayers: {
        'Google Hybrid':  tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}' , { enebled: true, maxZoom: 18, attribution: '...', subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }),
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      },
      overlays: { 
        'Geo JSON Polygon': geoJSON(
          ({
            type: 'Polygon',
    
            coordinates: [[
              [
                -67.92626,
                6.656333333333333
              ],
              [
                -49.38799999999998,
                6.656333333333333
              ],
              [
                -49.38799999999998,
                -3.89446
              ],
              [
                -67.92626,
                -3.89446
              ],
              [
                -67.92626,
                6.656333333333333
              ]]
            ]}) as any, { style: () => ({ color: '#ff7800' })})
      }
    }
    
    this.options = 	{ 
      zoom: 4,
      center: this.layersControl.overlays['Geo JSON Polygon'].getBounds().getCenter(),
      layers: [ this.layersControl.baseLayers['Google Hybrid'], this.layersControl.overlays['Geo JSON Polygon'] ]
    }

    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
    });
    
    this.get_users_ckan();
    this.getDataset(this.id)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  CopyBibTex(){
    this.snackBar.open("Copied to Clipboard", "", {
      duration: 2000,
    });
    this.id_proc = this.groupsNames[0].split(" ")[1] + this.year;
    for (let index = 0; index < this.groupsNames.length; index++) {
      this.bib_author = this.bib_author + this.groupsNames[index].replace(" ",", ");
      if (index != this.groupsNames.length -1){
        this.bib_author = this.bib_author + " and "
      }
    }
    let BibTex = '@dataset{'+ this.id_proc +', \n\xa0\xa0title\t\t = {{'+this.title+'}}, \n\xa0\xa0author\t = {'+this.bib_author+'}, \n\xa0\xa0month\t\t = '+this.month.toLowerCase()+',  \n\xa0\xa0year\t\t = '+this.year+',  \n\xa0\xa0publisher\t = {TerraBrasilis Research Data}, \n\xa0\xa0purl\t\t = {'+this.purl+'}, \n\xa0\xa0url\t\t = {'+this.url+'} \n}';
    Clipboard.copy(BibTex);
   }

  formatDateYear(date) {
    var d = new Date(date),
        year = d.getFullYear();
    return year;
  }

  formatDateMonth(date) {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oc", "Nov", "Dec"];

    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (day.length < 2) 
        day = '0' + day;

    return monthNames[month];
  }

  async getDataset(id: string){

    const response = await this.ds.get_ckan_dataset(id);
    this.DATASETS = response['result'];
    
    await this.getGroupsMembers( this.DATASETS['groups'][0].id,  this.DATASETS['groups'][0].title);
    
    this.metadata_created = this.DATASETS['metadata_created'];
    this.year = this.formatDateYear(this.DATASETS['metadata_created']);
    this.month = this.formatDateMonth(this.DATASETS['metadata_created']);
    this.tag  = this.DATASETS['tags'][0].name;
    this.tags = this.DATASETS['tags'];

    for (let index = 0; index < this.tags.length; index++) {
      this.tags_list[index] = this.tags[index].name.trim();
    }

    this.title = this.DATASETS['title'];
    this.users = this.groupsMembers.filter(x => (x.group_name == this.DATASETS['groups'][0].title));
    this.url = "http://terrabrasilisrd.dpi.inpe.br/"+"datasets/"+this.id
    this.abstract = this.DATASETS['notes'];
    this.resources = this.DATASETS['resources'];
    this.license = this.DATASETS['license_title'];
    this.author_email = this.DATASETS['author_email'];
    this.maintainer = this.DATASETS['maintainer'];
    this.extra = this.DATASETS['extras'];
    
    this.getDatasets();
  }

  async getDatasets(){

    const response = await this.ds.get_ckan_datasets();
    this.other_datasets = response['result']['results'];

    this.other_datasets = this.other_datasets.filter(x => ( this.tags_list.includes(x.tags[0].name.trim()) ));

  }

  async get_users_ckan(){
    const response = await this.ss.get_users_ckan();
    this.ckan_users = response['result'];
  }
  
  groupsMembers = [];
  groupsNames = [];

  async getGroupsMembers(id: string, name: string){
    const response = await this.ss.get_members(id);
    const responsedb = await this.gs.get_users_db();
    for (let index = 0; index < response['result'].length; index++) {
      this.groupsMembers.push({'group_name': name, 'id': response['result'][index][0], 'name': this.ckan_users.filter(x => (x.id == response['result'][index][0]))[0]['display_name'], 'img': responsedb.filter(x => (x.full_name == this.ckan_users.filter(x => (x.id == response['result'][index][0]))[0]['display_name']))[0].image    })
      this.groupsNames.push(this.ckan_users.filter(x => (x.id == response['result'][index][0]))[0]['display_name'])
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
  img: string;
}